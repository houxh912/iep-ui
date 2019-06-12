<template>
  <div style="position: fixed;z-index: 1000">
    <im-ui-small v-show="showType === 'small'" @showLarge="showType = 'large'"></im-ui-small>
    <im-ui-large v-show="showType === 'large'" @showSmall="showType = 'small'" @toChat="toChat"></im-ui-large>
    <chat-box
      v-show="$store.getters.imCurrentChatList.length > 0 && chatShow"
      :currentChat="currentChat"
      @chatChange="chatChange"
      @sendMessage="sendMessage"
      @chatAllClose="chatAllClose"
      @chatClose="chatClose"></chat-box>
  </div>
</template>

<script>
import imUiSmall from './components/imSmall/index.vue'
import imUiLarge from './components/imLarge/index.vue'
import chatBox from './components/chatBox/index.vue'
import store from '@/store'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { getUserListTree } from '@/api/admin/contacts'
import { getTotalHistory, clearUnread } from '@/api/im'
export default {
  name: 'im-ui',
  components: {
    imUiSmall,
    imUiLarge,
    chatBox,
  },
  data () {
    return {
      showType: 'small',
      chatShow: false,
      chatList: [],
      currentChat: {},
      socket: null,
      stompClient: null,
      userInfo: {},
    }
  },
  created () {
    this.initWebSocket()
    getUserListTree().then(({data}) => {
      this.$store.commit('setUserList', data.data)
      this.getUnreadHistory()
    })
  },
  methods: {
    initWebSocket () {
      this.connection()
//      let self = this
//      //断开重连机制,尝试发送消息,捕获异常发生时重连
//      this.timer = setInterval(() => {
//        try {
//          let TENANT_ID = getStore({ name: 'tenantId' }) ? getStore({ name: 'tenantId' }) : '1'
//          self.stompClient.send('/task/' + this.userInfo.username + '-' + TENANT_ID + '/remind')
//        } catch (err) {
//          console.log('断线了: ' + err)
//          self.connection()
//        }
//      }, 5000)
    },
    connection () {
      let token = store.getters.access_token
      let userInfo = store.getters.userInfo
      let headers = {
        'Authorization': 'Bearer ' + token,
      }
      this.socket = new SockJS(this.$wsUrl)//连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.debug = null
      this.stompClient.connect(headers, () => {
        this.$eventBus.$on('logout', () => {
          this.$store.commit('imClearAll')
          this.stompClient.disconnect(headers)
        })
        this.stompClient.subscribe(`/self/chat/${userInfo.userId}`, (data) => { // 订阅服务端提供的某个topic;
          let body = JSON.parse(data.body)
          this.$store.commit('addMessage', {
            id: body.id,
            message: body.msg,
            msgCode: body.msgCode,
            time: body.sendTime,
            username: body.targetName === userInfo.username ? body.resourceName : body.targetName,
            avatar: body.otherAvatar,
            realName: body.otherRealName,
            userId: body.otherId,
            type: body.targetName === userInfo.username ? 1 : 0,
            unread: (body.targetName === userInfo.username ? body.resourceName : body.targetName) !== this.currentChat.username ? 1 : 0,
          })
          if ((body.targetName === userInfo.username ? body.resourceName : body.targetName) === this.currentChat.username) {
            clearUnread({type: 1, targetId: body.otherId})
          }
        })
      }, (err) => {
        this.$message.error(err.message)
      })
    },
    sendMessage ({receiver, message, messageType}) {
      this.stompClient.send(`/unicast/${receiver.username}/${store.getters.userInfo.userId}-${receiver.userId}`, {}, JSON.stringify({msg: message, type: messageType, msgType: 1, msgCode: new Date().getTime()}))
    },
    getUnreadHistory () {
      getTotalHistory().then(({data}) => {
        if (data.code === 0) {
          this.$store.commit('initHistory', {history: data.data, username: this.$store.getters.userInfo.username})
        }
      }, error => {
        this.$message.error(error.message)
      })
    },
    toChat (user) {
      this.chatShow = true
      this.$store.commit('addCurrentChatList', user)
      clearUnread({type: 1, targetId: user.userId})
      this.currentChat = user
    },
    chatChange (user) {
      this.$store.commit('clearUserUnread', user.username)
      this.currentChat = user
    },
    chatClose (user) {
      let imCurrentChatList = this.$store.getters.imCurrentChatList
      for (let i = imCurrentChatList.length; i--;) {
        if (imCurrentChatList[i].userId === user.userId) {
          if (user.userId === this.currentChat.userId) {
            if (i > 0) {
              this.currentChat = imCurrentChatList[i - 1]
            } else if (imCurrentChatList.length > 1) {
              this.currentChat = imCurrentChatList[1]
            } else {
              this.currentChat = {}
            }
          }
          this.$store.commit('closeCurrentChatList', i)
          return
        }
      }
    },
    chatAllClose () {
      this.chatShow = false
      this.currentChat = {}
    },
  },
}
</script>

<style lang="scss" scoped>
</style>