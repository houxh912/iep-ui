<template>
  <div class="chat-content">
    <div class="chat-box">
      <div class="chat-group">
        <div class="chat-title">
          <img class="chat-title-head"
               :src="chatDetail.avatar ? chatDetail.avatar : '/img/icons/apple-touch-icon-60x60.png'"/>
          <span class="chat-title-name">{{chatDetail.realName}}</span>
        </div>
        <div class="chat-main">
          <div class="chat-main-new" v-show="messageNew" @click="readNew">
            {{chatDetail.realName}}:{{messageNew}}
          </div>
          <div class="chat-main-box" ref="chatmain" @scroll="onScroll">
            <ul>
              <li v-show="$store.getters.imMessageMore(chatDetail.username)" class="chat-more">
                <i v-show="loadingMore" class="el-icon-loading"></i>
                <span v-show="!loadingMore" @click="getMore">点击查看更多</span>
              </li>
              <li v-for="message in messageList"
                  :key="message.id"
                  :style="getDirectionStyle(message.type)">
                <img src=""/>
                <div class="chat-main-content">
                  <span>{{message.time}}</span>
                  <p>{{message.message}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="chat-footer">
          <div class="chat-textarea">
            <textarea @keydown.13.prevent="keydown($event)" v-model="message"></textarea>
          </div>
          <div class="chat-bottom">
            <div class="chat-btn">
              <span class="chat-btn-close" @click="closeChat">关闭</span>
              <span class="chat-btn-send" @click="sendMessage">发送</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoreHistory } from '@/api/im'
export default {
  name: 'chat-content',
  data () {
    return {
      message: '',
      loadingMore: false,
      messageList: [],
      messageNew: '',
    }
  },
  props: {
    chatDetail: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  created () {
    this.messageList = Object.assign([], this.getMessageList)
  },
  methods: {
    readNew () {
      this.$refs.chatmain.scrollTop = this.$refs.chatmain.scrollHeight
    },
    onScroll () {
      if (this.$refs.chatmain.scrollTop > this.$refs.chatmain.scrollHeight - this.$refs.chatmain.offsetHeight - 20) {
        this.messageNew = ''
      }
    },
    keydown (event) {
      if (event.keyCode === 13) {
        if (event.shiftKey) {
          this.message += '\r\n'
        } else {
          this.sendMessage()
        }
      }
    },
    sendMessage () {
      this.$emit('sendMessage', {receiver: this.chatDetail, message: this.message, messageType: 1})
      this.message = ''
    },
    closeChat () {
      this.$emit('chatClose', this.chatDetail)
    },
    getDirectionStyle (type) {
      return {
        flexDirection: type === 0 ? 'row-reverse' : 'row',
        textAlign: type === 0 ? 'right' : 'left',
      }
    },
    getMore () {
      this.loadingMore = true
      let msgCode = 0
      if (this.getMessageList && this.getMessageList[0]) {
        msgCode = this.getMessageList[0].msgCode
      }
      getMoreHistory({
        targetId: this.chatDetail.userId,
        type: 1,
        msgCode,
      }).then(({data}) => {
        if (data.code === 0) {
          this.$store.commit('addHistoryMessage', {
            list: data.data,
            username: this.chatDetail.username,
          })
        }
      }, error => {
        this.$message.error(error.message)
      }).finally(() => {
        this.loadingMore = false
      })
    },
  },
  computed: {
    getMessageList () {
      return this.$store.getters.imMessage(this.chatDetail.username)
    },
  },
  watch: {
    getMessageList: {
      handler: function (newVal) {
        this.messageList = Object.assign([], newVal)
      },
    },
    messageList: {
      handler: function (newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          let oldHeight = this.$refs.chatmain.scrollHeight
          let oldScrollTop = this.$refs.chatmain.scrollTop
          if (!oldVal || oldVal.length === 0 || (newVal[newVal.length - 1].id !== oldVal[oldVal.length - 1].id) && newVal[newVal.length - 1].type === 0) {
            this.$nextTick(() => {
              this.$refs.chatmain.scrollTop = this.$refs.chatmain.scrollHeight
            })
          } else if (newVal[newVal.length - 1].id === oldVal[oldVal.length - 1].id) {
            this.$nextTick(() => {
              this.$refs.chatmain.scrollTop = oldScrollTop + this.$refs.chatmain.scrollHeight - oldHeight
            })
          } else {
            this.messageNew = newVal[newVal.length - 1].message
          }
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-content {
    flex: 1 1 400px;
    .chat-list {
      display: none;
    }
    .chat-box {
      display: block;
      height: 100%;
      width: 100%;
      .chat-group {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        position: relative;
        .chat-title {
          position: absolute;
          top: -80px;
          left: 0;
          height: 80px;
          .chat-title-head {
            position: absolute;
            left: 15px;
            top: 15px;
            height: 50px;
            width: 50px;
            border-radius: 25px;
          }
          .chat-title-name {
            display: block;
            position: absolute;
            left: 80px;
            top: 15px;
            height: 20px;
            line-height: 20px;
            white-space: nowrap;
            font-size: 18px;
          }
        }
        .chat-main {
          position: relative;
          flex: 1 1 200px;
          .chat-main-new {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            background: rgba(186, 27, 33, .8);
            z-index: 2;
            cursor: pointer;
            font-size: 12px;
          }
          .chat-main-box {
            position: absolute;
            padding: 15px;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            overflow-y: auto;
            z-index: 1;
            ul {
              padding: 0;
              li {
                margin-bottom: 10px;
                list-style: none;
                display: flex;
                flex-wrap: nowrap;
                &.chat-more {
                  justify-content: center;
                  align-items: flex-start;
                  font-size: 12px;
                  color: #BA1B21;
                }
              }
            }
          }
        }
        .chat-footer {
          flex: 0 0 110px;
          border-top: 1px solid #EEEEEE;
          .chat-textarea {
            textarea {
              display: block;
              width: 100%;
              padding: 5px;
              height: 70px;
              line-height: 20px;
              border: none;
              overflow: auto;
              resize: none;
            }
          }
          .chat-bottom {
            position: relative;
            height: 40px;
            .chat-btn {
              position: absolute;
              top: 2px;
              right: 10px;
              height: 30px;
              > span {
                display: inline-block;
                margin-left: 10px;
                height: 30px;
                line-height: 30px;
                vertical-align: middle;
                padding: 0 20px;
                border-radius: 3px;
                background: #BA1B21;
                cursor: pointer;
                color: #FFFFFF;
                &:hover {
                  opacity: .8;
                }
              }
            }
          }
        }
      }
    }
  }
</style>