<template>
  <div style="position: fixed;z-index: 1000">
    <im-ui-small v-show="showType === 'none'" @showLarge="showType = 'large'"></im-ui-small>
    <im-ui-large v-show="showType === 'large'" @showSmall="showType = 'small'"></im-ui-large>
    <chat-box v-show="$store.getters.imCurrentChatList.length > 0 && $store.getters.imChatShow"
      @sendMessage="sendMessage"></chat-box>
    <consultation v-show="true" @showLarge="showType = 'large'"></consultation>
  </div>
</template>

<script>
import imUiSmall from './components/imSmall/index.vue'
import imUiLarge from './components/imLarge/index.vue'
import chatBox from './components/chatBox/index.vue'
import store from '@/store'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { clearUnread } from '@/api/im'
import { mapGetters } from 'vuex'
import consultation from './components/consultation/index'

export default {
  name: 'im-ui',
  components: {
    imUiSmall,
    imUiLarge,
    chatBox,
    consultation,
  },
  data () {
    return {
      showType: 'small',
      chatShow: false,
      chatList: [],
      socket: null,
      stompClient: null,
      subscribeMap: {},
    }
  },
  created () {
    this.initWebSocket()
    this.$eventBus.$on('chatShow', () => {
      this.showType = 'large'
    })
  },
  methods: {
    initWebSocket () {
      this.connection()
    },
    connection () {
      let token = store.getters.access_token
      let headers = {
        'Authorization': 'Bearer ' + token,
      }
      this.socket = new SockJS(this.$wsUrl)
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.debug = null
      this.stompClient.connect(headers, () => {
        this.$store.dispatch('getUserListTree').then(() => {
          this.getGroup()
          this.getCustomGroup()
        })
        this.$eventBus.$on('logout', () => {
          this.$store.commit('imClearAll')
          this.stompClient.disconnect(headers)
        })
        this.stompClient.subscribe(`/self/chat/${this.userInfo.userId}`, (data) => { // 订阅服务端提供的某个topic;
          let body = JSON.parse(data.body)
          this.$store.commit('addMessage', {
            id: body.id,
            chatNo: `user${body.otherId}`,
            message: body.msg,
            messageType: body.msgType,
            msgCode: body.msgCode,
            time: body.sendTime,
            username: body.targetName === this.userInfo.username ? body.resourceName : body.targetName,
            avatar: body.otherAvatar,
            resourceName: body.resourceName,
            realName: body.otherRealName,
            userId: body.otherId,
            type: 1,
            sendOrReceive: body.targetName === this.userInfo.username ? 1 : 0,
            unread: (body.targetName === this.userInfo.username && `user${body.otherId}` !== this.imCurrentChat.chatNo) ? 1 : 0,
          })
          if ((body.targetName === this.userInfo.username ? body.resourceName : body.targetName) === this.imCurrentChat.username) {
            clearUnread({type: 1, targetId: body.otherId})
          }
        })
        this.stompClient.subscribe(`/self/system/${this.userInfo.userId}`, (data) => {
          let body = JSON.parse(data.body)
          if (body.msgType === 1 || body.msgType === 2  || body.msgType === 4 || body.msgType === 6) {
            this.$store.commit('updateGroup', {
              id: body.groupId,
              groupName: body.groupName,
              avatar: body.groupAvatar,
              originatorId: body.originatorId,
              type:body.msgType === 1 || body.msgType === 2,
            })
            if (body.msgType === 4 || body.msgType === 6) {
              let imCurrentChatList = this.$store.getters.imCurrentChatList
              for (let i = imCurrentChatList.length; i--;) {
                if (imCurrentChatList[i].chatNo === `group${body.groupId}`) {
                  if (`group${body.groupId}` === this.imCurrentChat.chatNo) {
                    if (i > 0) {
                      this.$store.dispatch('updateCurrentChat', {chat: imCurrentChatList[i - 1], show: true})
                    } else if (imCurrentChatList.length > 1) {
                      this.$store.dispatch('updateCurrentChat', {chat: imCurrentChatList[1], show: true})
                    } else {
                      this.$store.dispatch('updateCurrentChat', {chat: null, show: true})
                    }
                  }
                  this.$store.commit('closeCurrentChatList', i)
                  return
                }
              }
            }
          } else if (body.msgType === 3 || body.msgType === 7) {
            this.$store.commit('updateGroupMember', {
              groupId: body.groupId,
              type: body.msgType === 3,
              ids: JSON.parse(body.membersIds),
            })
          } else {
            // 用来接收聊天之外的消息，逻辑在这里写
          }
        })
      }, (err) => {
        console.warn(err)
      })
    },
    sendMessage ({receiver, message, messageType}) {
      let data = JSON.stringify({
        msg: message,
        type: receiver.type,
        msgType: messageType,
        msgCode: new Date().getTime(),
      })
      this.stompClient.send(`/unicast/${receiver.username}/${this.userInfo.userId}-${receiver.id}`, {}, data)
    },
    getGroup () {
      this.$store.dispatch('initGroup').then(() => {
        this.initHistory()
      })
    },
    getCustomGroup () {
      this.$store.dispatch('initCustomGroup')
    },
    updateGroupMap (list) {
      let ids = []
      for (let i = list.length; i--;) {
        ids.push(`group${list[i].id}`)
        if (!this.subscribeMap.hasOwnProperty(`group${list[i].id}`)) {
          let subscribe = {}
          subscribe[`group${list[i].id}`] = this.stompClient.subscribe(`/public/${list[i].id}`, (data) => {
            let body = JSON.parse(data.body)
            this.$store.commit('addMessage', {
              id: body.id,
              chatNo: `group${body.otherId}`,
              message: body.msg,
              messageType: body.msgType,
              msgCode: body.msgCode,
              time: body.sendTime,
              username: body.targetName,
              avatar: body.otherAvatar,
              resourceName: body.resourceName,
              realName: body.targetName,
              userId: body.otherId,
              type: 2,
              sendOrReceive: body.resourceName !== this.userInfo.username ? 1 : 0,
              unread: (body.resourceName !== this.userInfo.username && `group${body.otherId}` !== this.imCurrentChat.chatNo) ? 1 : 0,
            })
            if (`group${body.otherId}` === this.imCurrentChat.chatNo) {
              clearUnread({type: 2, targetId: body.otherId})
            }
          })
          this.subscribeMap = {...this.subscribeMap, ...subscribe}
        }
      }
      let subscribeMap = Object.assign({}, this.subscribeMap)
      for (let key in subscribeMap) {
        if (!ids.includes(key)) {
          this.subscribeMap[key].unsubscribe()
          delete subscribeMap[key]
        }
      }
      this.subscribeMap = subscribeMap
    },
    initHistory () {
      this.$store.dispatch('initHistory', this.userInfo.userId).then(null, (error) => {
        this.$message.error(error.msg)
      })
    },
  },
  computed: {
    ...mapGetters(
      ['imCurrentChat', 'userInfo', 'imGroups']
    ),
  },
  watch: {
    imGroups (newVal) {
      this.updateGroupMap(newVal)
    },
  },
}
</script>