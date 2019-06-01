<template>
  <div style="position: fixed;z-index: 1000">
    <im-ui-small v-show="showType === 'small'" @showLarge="showType = 'large'"></im-ui-small>
    <im-ui-large v-show="showType === 'large'" @showSmall="showType = 'small'" @toChat="toChat"></im-ui-large>
    <chat-box
      v-show="chatList.length > 0"
      :chatList="chatList"
      :currentChat="currentChat"
      @chatChange="chatChange"
      @sendMessage="sendMessage"
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
import { fetchList } from '@/api/admin/user'
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
      chatList: [],
      currentChat: {},
      socket: null,
      stompClient: null,
      userInfo: {},
    }
  },
  created () {
    this.initWebSocket()
    fetchList({size: 10000}).then(({data}) => {
      if (data.code === 0) {
        this.$store.commit('setUserList', data.data.records)
      }
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
      // 建立连接对象
      this.socket = new SockJS(this.$wsUrl)//连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      this.stompClient = Stomp.over(this.socket)
      // 向服务器发起websocket连接
      this.stompClient.connect(headers, () => {
        this.stompClient.subscribe(`/self/chat/${userInfo.userId}`, (data) => { // 订阅服务端提供的某个topic;
          let body = JSON.parse(data.body)
          this.$store.commit('addMessage', {
            message: body.msg,
            time: body.sendTime,
            username: body.targetName === userInfo.username ? body.resourceName : body.targetName,
            type: body.targetName === userInfo.username ? 1 : 0,
          })
        })
        this.stompClient.subscribe('/public/chat/online', (data) => {
          console.log(data)
        })
      }, (err) => {
        console.log(err)
      })
    },
    sendMessage ({receiver, message, messageType}) {
      this.stompClient.send(`/unicast/${receiver.username}/${store.getters.userInfo.userId}-${receiver.userId}`, {}, JSON.stringify({msg: message, type: messageType, msgType: 1, msgCode: new Date().getTime()}))
    },
    toChat (chat) {
      if (this.newChat(chat)) {
        this.chatList.push(chat)
      }
      this.currentChat = chat
    },
    chatChange (chat) {
      this.currentChat = chat
    },
    chatClose (chat) {
      for (let i = this.chatList.length; i--;) {
        if (this.chatList[i].userId === chat.userId) {
          if (chat.userId === this.currentChat.userId) {
            if (i > 0) {
              this.currentChat = this.chatList[i - 1]
            } else if (this.chatList.length > 1) {
              this.currentChat = this.chatList[1]
            } else {
              this.currentChat = {}
            }
          }
          this.chatList.splice(i, 1)
          return
        }
      }
    },
    newChat (chat) {
      for (let i = this.chatList.length; i--;) {
        if (this.chatList[i].userId === chat.userId) {
          this.chatList.splice(i, 1, chat)
          return false
        }
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
</style>