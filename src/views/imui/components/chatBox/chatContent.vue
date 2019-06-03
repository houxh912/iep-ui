<template>
  <div class="chat-content">
    <div class="chat-box">
      <div class="chat-group">
        <div class="chat-title">
          <img class="chat-title-head" :src="chatDetail.avatar ? chatDetail.avatar : '/img/icons/apple-touch-icon-60x60.png'"/>
          <span class="chat-title-name">{{chatDetail.realName}}</span>
        </div>
        <div class="chat-main" ref="chatmain">
          <ul>
            <li v-for="(message, index) in getMessageList" :key="index" :style="getDirectionStyle(message.type)">
              <img src=""/>
              <div class="chat-main-content">
                <span>{{message.time}}</span>
                <p>{{message.message}}</p>
              </div>
            </li>
          </ul>
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
export default {
  name: 'chat-content',
  data () {
    return {
      message: '',
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
  methods: {
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
  },
  computed: {
    getMessageList () {
      return this.$store.getters.imMessage(this.chatDetail.username)
    },
  },
  watch: {
    getMessageList: {
      handler: function () {
        this.$nextTick(() => {
          this.$refs.chatmain.scrollTop = this.$refs.chatmain.scrollHeight
        })
      },
      deep: true,
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
          flex: 1 1 200px;
          overflow-y: auto;
          padding: 15px 15px 5px 15px;
          ul {
            padding: 0;
            li {
              margin-bottom: 10px;
              list-style: none;
              display: flex;
              flex-wrap: nowrap;
              .head-image {

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