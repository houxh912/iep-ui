<template>
  <div class="chat-list-box">
    <ul class="chat-list">
      <li
        v-for="(chat, index) in $store.getters.imCurrentChatList"
        :key="index" @click="chatChange(chat)"
        :class="currentChat === chat.userId ? 'chosen' : ''">
        <img :src="chat.avatar ? chat.avatar : '/img/icons/apple-touch-icon-60x60.png'"/>
        <span>{{chat.realName}}</span>
        <i class="icon-font icon-guanbi" @click.stop="chatClose(chat)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chat-list',
  props: {
    currentChat: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    chatChange (chat) {
      this.$emit('chatChange', chat)
    },
    chatClose (chat) {
      this.$emit('chatClose', chat)
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-list-box {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  overflow: hidden;
  li {
    list-style: none;
  }
  .chat-list {
    height: 100%;
    width: 250px;
    background: #D9D9D9;
    overflow-y: auto;
    padding: 0;
    &:hover {
      width: 200px;
    }
    li {
      box-sizing: border-box;
      max-width: 190px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      position: relative;
      box-sizing: border-box;
      margin: 5px;
      height: 50px;
      padding: 5px 30px 5px 5px;
      border-radius: 3px;
      cursor: pointer;
      img {
        flex: 0 0 40px;
        height: 40px;
        width: 40px;
        border-radius: 20px;
      }
      span {
        flex: 0 1 100px;
        margin-left: 10px;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        display: block;
        position: absolute;
        right: 5px;
        top: 15px;
        font-size: 14px;
        &:hover {
          color: #BA1B21;
        }
      }
      &:hover {
        background: #E2E2E2;
      }
      &.chosen {
        background: #F3F3F3;
      }
    }
  }
}
</style>