<template>
  <div ref="imbox" class="im-box-large" :style="getPosition">
    <div class="drag" @mousedown="mousedown"></div>
    <div class="im-main">
      <div class="im-info">
        <div class="close-button" @click="showSmall"></div>
      </div>
      <ul class="im-table">
        <li :class="tableChosen === 'book' ? 'chosen' : ''"
            @click="tableChosen = 'book'">通讯录</li>
        <li :class="tableChosen === 'chat' ? 'chosen' : ''"
            @click="tableChosen = 'chat'">
          <span>聊天</span>
          <el-badge class="unread-point"
                    :max="99"
                    v-show="$store.getters.imUnreadTotal"
                    :value="$store.getters.imUnreadTotal">
          </el-badge>
        </li>
      </ul>
      <div class="im-tabel-content-large-im">
        <el-tree
                v-show="tableChosen === 'book'"
                @node-click="toChat"
                :data="$store.getters.imUserTree"
                node-key="id"
                :expand-on-click-node="false">
          <span v-if="data.leaf"
                class="im-tabel-content-large-im-item"
                slot-scope="{ node, data }">
            <span class="im-friend">
              <iep-img class="im-friend-head"
                   :src="data.avatar ? data.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
              <span>{{data.label}}</span>
            </span>
          </span>
          <span v-else>{{ data.label }}</span>
        </el-tree>
        <ul v-show="tableChosen === 'chat'" class="im-chat-list">
          <li class="im-friend"
              v-for="user in $store.getters.imChatList"
              @click="toChatUser(user)"
              :key="user.id">
            <iep-img class="im-friend-head"
                 :src="user.avatar ? user.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
            <span>{{user.realName}}</span>
            <el-badge class="unread-point"
                      v-show="$store.getters.imUnread(user.username)"
                      :max="99"
                      :value="$store.getters.imUnread(user.username)"></el-badge>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'im-ui-large',
  data () {
    return {
      tableChosen: 'book',
      mousePosition: {
        x: 0,
        y: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      boxWidth: 0,
      boxHeight: 0,
    }
  },
  mounted () {
    this.boxWidth = this.$refs.imbox.offsetWidth
    this.boxHeight = this.$refs.imbox.offsetHeight
  },
  methods: {
    positionChange (translate) {
      if (this.position.x + translate.x < 0 && this.position.x + translate.x > this.boxWidth - this.windowSize.width) {
        this.position.x = this.position.x + translate.x
      }
      if (this.position.y + translate.y < 0 && this.position.y + translate.y > this.boxHeight - this.windowSize.height) {
        this.position.y = this.position.y + translate.y
      }
    },
    mousedown () {
      document.body.style['user-select'] = 'none'
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    },
    mousemove (event) {
      this.positionChange({
        x: event.clientX - this.mousePosition.x,
        y: event.clientY - this.mousePosition.y,
      })
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    },
    mouseup () {
      document.body.style['user-select'] = 'auto'
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
    showSmall () {
      this.$emit('showSmall')
    },
    toChat (data) {
      if (data.leaf) {
        let chat = {
          username: data.py,
          realName: data.label,
          avatar: data.avatar,
          userId: data.value,
        }
        this.$emit('toChat', chat)
      }
    },
    toChatUser (user) {
      this.$emit('toChat', user)
    },
  },
  computed: {
    getPosition () {
      return {
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

<style scoped>
  .im-tabel-content-large-im >>> .el-tree-node__content {
    height: auto;
  }
   .im-tabel-content-large-im >>> .is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
    display: none;
  }
</style>

<style lang="scss" scoped>
.im-box-large {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 260px;
  background: #FFFFFF;
  border-radius: 2px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  li {
    list-style: none;
  }
  .drag {
    cursor: move;
    height: 20px;
  }
  .im-main {
    overflow: hidden;
    .im-table {
      margin: 10px 0 0;
      padding: 9px 0;
      li {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        position: relative;
        width: 50%;
        text-align: center;
        &:hover {
          opacity: .8;
        }
        &.chosen:after {
          position: absolute;
          content: '';
          bottom: -2px;
          left: 0;
          right: 0;
          border-bottom: 2px solid #BA1B21;
          cursor: pointer;
          opacity: 1;
        }
      }
    }
    .im-info {
      height: 20px;
      .close-button {
        float: right;
        padding: 9px 5px;
        height: 20px;
        width: 20px;
        cursor: pointer;
        &:after {
          display: block;
          content: '';
          height: 2px;
          width: 10px;
          background: #AAAAAA;
        }
      }
    }
  }
  .im-tabel-content-large-im {
    height: 400px;
    width: 290px;
    padding: 10px 0;
    overflow-y: auto;
    &:hover {
      width: 260px;
    }
  }
  .im-chat-list {
    padding: 0;
    .im-friend {
      box-sizing: border-box;
      height: 52px;
      max-width: 260px;
      padding: 5px 15px 5px 60px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #F5F7FA;
      }
      .im-friend-head {
        position: absolute;
        left: 15px;
        top: 8px;
        height: 36px;
        width: 36px;
        border-radius: 18px;
      }
      .unread-point {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      span {
        display: inline-block;
        vertical-align: top;
        margin-top: 4px;
        max-width: 185px;
        line-height: 19px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      p {
        line-height: 18px;
        max-width: 185px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #DFDFDF;
        font-size: 12px;
      }
    }
  }
  .im-tabel-content-large-im .im-tabel-content-large-im-item {
    position: relative;
    box-sizing: border-box;
    height: 52px;
    max-width: 260px;
    padding: 5px 15px 5px 60px;
    cursor: pointer;
    .im-friend {
      .im-friend-head {
        position: absolute;
        left: 15px;
        top: 8px;
        height: 36px;
        width: 36px;
        border-radius: 18px;
      }
      span {
        display: inline-block;
        vertical-align: top;
        margin-top: 4px;
        max-width: 185px;
        line-height: 19px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      p {
        line-height: 18px;
        max-width: 185px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #DFDFDF;
        font-size: 12px;
      }
    }
  }
}
</style>