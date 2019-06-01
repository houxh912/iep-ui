<template>
  <div class="gov-chat" :style="getLeftStyle">
    <chat-list
      v-show="chatList.length > 1"
      :currentChat="currentChatId"
      :chatList="chatList"
      @chatChange="chatChange"
      @chatClose="chatClose"></chat-list>
    <chat-total-title></chat-total-title>
    <chat-content
      v-for="(chat, index) in chatList"
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
    chatList: {
      type: Array,
      default () {
        return []
      },
    },
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
      moveHorizonal: 0,
      moveVertical: 0,
      currentChatId: null,
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
        paddingLeft: this.chatList.length > 1 ? '200px' : '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .gov-chat {
    position: fixed;
    box-sizing: content-box;
    height: 520px;
    width: 600px;
    background: #FFFFFF;
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    z-index: 10;
  }
</style>