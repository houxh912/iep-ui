<template>
  <div class="gov-chat" :style="getLeftStyle">
    <chat-list
      v-show="$store.getters.imCurrentChatList.length > 1"
      :currentChat="currentChatId"
      @chatChange="chatChange"
      @chatClose="chatClose"></chat-list>
    <chat-total-title @positionChange="positionChange"></chat-total-title>
    <chat-content
      v-for="(chat, index) in $store.getters.imCurrentChatList"
      :key="index"
      v-show="currentChatId === chat.userId"
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
  props: {
    currentChat: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight,
      currentChatId: null,
      position: {
        x: 0,
        y: 0,
      },
    }
  },
  mounted () {
    window.onresize = () => {
      this.clientWidth = document.body.clientWidth
      this.clientHeight = document.body.clientHeight
      this.position = {
        x: 0,
        y: 0,
      }
    }
  },
  watch: {
    currentChat: {
      handler: function (newVal) {
        this.currentChatId = newVal.userId
      },
      deep: true,
    },
  },
  methods: {
    positionChange (translate) {
      if (Math.abs(this.position.x + translate.x) < this.clientWidth / 2 - (this.$store.getters.imCurrentChatList.length > 1 ? 400 : 300)) {
        this.position.x = this.position.x + translate.x
      }
      if (Math.abs(this.position.y + translate.y) < this.clientHeight / 2 - 260) {
        this.position.y = this.position.y + translate.y
      }
    },
    chatChange (chat) {
      this.$emit('chatChange', chat)
    },
    sendMessage (data) {
      this.$emit('sendMessage', data)
    },
    chatClose (chat) {
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
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
</style>