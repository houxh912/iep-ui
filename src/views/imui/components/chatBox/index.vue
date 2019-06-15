<template>
  <div class="gov-chat" :style="getLeftStyle">
    <chat-list
      v-show="$store.getters.imCurrentChatList.length > 1"
      @chatClose="chatClose"></chat-list>
    <chat-total-title @positionChange="positionChange"></chat-total-title>
    <chat-content
      v-for="chat in $store.getters.imCurrentChatList"
      :key="chat.chatNo"
      v-show="$store.getters.imCurrentChat.chatNo === chat.chatNo"
      :chatDetail="chat"
      @sendMessage="sendMessage"
      @chatClose="chatClose"></chat-content>
  </div>
</template>

<script>
import chatTotalTitle from './chatTotalTitle.vue'
import chatContent from './chatContent.vue'
import chatList from './chatList.vue'
export default {
  name: 'chat-box',
  components: {
    chatTotalTitle,
    chatContent,
    chatList,
  },
  data () {
    return {
      position: {
        x: 0,
        y: 0,
      },
    }
  },
  methods: {
    chatAllClose () {
      this.$emit('chatAllClose')
    },
    positionChange (translate) {
      if (Math.abs(this.position.x + translate.x) < this.windowSize.width / 2 - (this.$store.getters.imCurrentChatList.length > 1 ? 400 : 300)) {
        this.position.x = this.position.x + translate.x
      }
      if (Math.abs(this.position.y + translate.y) < this.windowSize.height / 2 - 260) {
        this.position.y = this.position.y + translate.y
      }
    },
    sendMessage (data) {
      this.$emit('sendMessage', data)
    },
    chatClose (chat) {
      let currentChat = this.$store.getters.imCurrentChat
      let imCurrentChatList = this.$store.getters.imCurrentChatList
      for (let i = imCurrentChatList.length; i--;) {
        if (imCurrentChatList[i].chatNo === chat.chatNo) {
          if (chat.chatNo === currentChat.chatNo) {
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

      this.$emit('chatClose', chat)
    },
  },
  computed: {
    getLeftStyle () {
      return {
        paddingLeft: this.$store.getters.imCurrentChatList.length > 1 ? '200px' : '',
        marginLeft: this.$store.getters.imCurrentChatList.length > 1 ? '-400px' : '-300px',
        transform: `translate(${this.position.x}px, ${this.position.y}px)`,
      }
    },
    windowSize () {
      return this.$store.getters.windowSize
    },
  },
  watch: {
    windowSize () {
      this.position = {
        x: 0,
        y: 0,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .gov-chat {
    position: fixed;
    box-sizing: content-box;
    left: 50%;
    top: 50%;
    margin-top: -260px;
    height: 520px;
    width: 600px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
</style>