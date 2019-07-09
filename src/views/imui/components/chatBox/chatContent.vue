<template>
  <div class="chat-content">
    <div class="chat-box">
      <div class="chat-group">
        <div class="chat-title">
          <iep-img class="chat-title-head"
               :src="chatDetail.avatar ? chatDetail.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
          <span class="chat-title-name">{{chatDetail.chatName}}</span>
          <span v-if="chatDetail.type == 2"
                class="chat-title-members"
                :class="{show : membersShow}"
                @click="membersShow = !membersShow">
            {{groupMembers.length}}人
            <span>
              <i class="icon iconfont icon-arrow-down"></i>
            </span>
          </span>
        </div>
        <div class="chat-main">
          <ul v-if="chatDetail.type == 2"
              :style="getHeightStyle"
              v-show="membersShow"
              class="chat-member-list">
            <li class="chat-member"
                v-for="member in groupMembers"
                :key="member.membersId"
                @click="toChat(member)">
              <iep-img class="headimage" :src="member.avatar"></iep-img>
              <p>{{member.realName}}</p>
            </li>
            <li class="chat-member" style="cursor: auto">
              <div @click="dialogShow = true" class="btn-add-member">
                <i class="icon iconfont icon-xinzeng" style="font-size: 30px;"></i>
              </div>
            </li>
          </ul>
          <div class="chat-main-new" v-show="messageNew" @click="readNew">
            {{messageNew}}
          </div>
          <div class="chat-main-box" ref="chatmain" @scroll="onScroll">
            <ul>
              <li v-show="$store.getters.imMessageMore(chatDetail.chatNo)" class="chat-more">
                <i v-show="loadingMore" class="el-icon-loading"></i>
                <span v-show="!loadingMore" @click="getMore">点击查看更多</span>
              </li>
              <li v-for="message in messageList"
                  :key="message.id"
                  :style="getDirectionStyle(message.sendOrReceive)">
                <img class="headimage" :src="message.avatar ? message.avatar : '/img/icons/apple-touch-icon-60x60.png'"/>
                <div class="chat-main-content">
                  <span>{{message.time}}</span><br>
                  <p v-html="messageFormat(message.message)"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="chat-footer">
          <div class="chat-textarea">
            <textarea @keydown.13.prevent="keydown($event)" v-model.trim="message"></textarea>
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
    <a-drawer :visible="dialogShow" title="添加组成员" width="300" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" class="filter-tree" :filter-node-method="filterNode" :props="props" :data="$store.getters.imUserTree" node-key="value">
      <span v-if="node.value!==1" class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
        <span v-if="node.level===3">
          <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click="() => selectGroup(data)">选择</el-button>
        </span>
      </span>
      </el-tree>
      <div v-show="dialogShow" style="position: fixed;right: 300px;top: 0;bottom: 0;width: 300px;overflow-y: auto;background: #FFFFFF;padding: 20px;">
        <div style="margin: 5px 0;text-align: center;">
          <iep-button style="margin: 0 5px;" @click.native="updateGroupMember">确定</iep-button>
          <iep-button style="margin: 0 5px;" @click.native="clearGroup">重置</iep-button>
        </div>
        <el-tag
                style="margin: 5px;"
                :key="user.userId"
                v-for="(user, index) in users"
                closable
                :disable-transitions="false"
                @close="handleClose(index)">
          {{user.realName}}
        </el-tag>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { getMoreHistory, updateGroupMember } from '@/api/im'
const urlReg = new RegExp('((http(s)?:\\/\\/)?(\\w+\\.)+(com|net|org|cn|xin|top|cc|online)(\\/(\\w)*)*)', 'gi')

export default {
  name: 'chat-content',
  data () {
    return {
      message: '',
      loadingMore: false,
      messageList: [],
      messageNew: '',
      membersShow: false,
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
      filterText: '',
      users: [],
      membersId: [],
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
    this.initGroupMembers()
    this.messageList = Object.assign([], this.getMessageList)
  },
  methods: {
    close () {
      this.clearGroup()
      this.dialogShow = false
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectGroup (data) {
      this.users.push({
        userId: data.value,
        realName: data.label,
      })
      this.membersId.push(data.value)
    },
    handleClose (index) {
      this.users.splice(index, 1)
      this.membersId.splice(index, 1)
    },
    updateGroupMember () {
      let group = {
        groupId: this.chatDetail.id,
        type: 0,
        ids: this.membersId,
      }
      updateGroupMember(group).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('修改成功！')
          this.dialogShow = false
          this.clearGroup()
        }
      }, error => {
        this.$message.error(error.msg)
      })
    },
    clearGroup () {
      this.filterText = ''
      this.users = []
      this.membersId = []
    },
    isDisabled (data, node) {
      if (node.level === 3 && this.membersId.includes(data.value)) {
        return true
      }
      return false
    },

    messageFormat (msg) {
      return msg.replace(urlReg, '<a class="msg-link" href="//$1" target="_blank">$1</a>')
    },
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
      if (this.message !== '') {
        this.$emit('sendMessage', {receiver: this.chatDetail, message: this.message, messageType: 1})
      } else {
        this.$message.warning('发送内容不能为空！')
      }
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
        targetId: this.chatDetail.id,
        type: this.chatDetail.type,
        msgCode,
      }).then(({data}) => {
        if (data.code === 0) {
          this.$store.commit('addHistoryMessage', {
            list: data.data,
            selfId: this.$store.getters.userInfo.userId,
            type: this.chatDetail.type,
            targetId: this.chatDetail.id,
          })
        }
      }, error => {
        this.$message.error(error.message)
      }).finally(() => {
        this.loadingMore = false
      })
    },
    initGroupMembers () {
      if (!this.$store.getters.imGroupMember(this.chatDetail.chatNo)) {
        this.$store.dispatch('setGroupMembers', this.chatDetail.id)
      }
    },
    toChat (user) {
      let chat = {
        id: user.membersId,
        chatNo: `user${user.membersId}`,
        username: user.membersName,
        chatName: user.realName,
        avatar: user.avatar,
        type: 1,
      }
      this.$store.dispatch('updateCurrentChat', {chat, show: true})
    },
  },
  computed: {
    groupMembers () {
      return this.$store.getters.imGroupMember(this.chatDetail.chatNo) || []
    },
    getMessageList () {
      return this.$store.getters.imMessage(this.chatDetail.chatNo)
    },
    getHeightStyle () {
      let height = this.groupMembers.length > 4 ? '202px' : '102px'
      return {
        height: this.membersShow ? height : '0px',
      }
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
          if (!oldVal || oldVal.length === 0 || (newVal[newVal.length - 1].id !== oldVal[oldVal.length - 1].id) && newVal[newVal.length - 1].sendOrReceive === 0) {
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
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>

<style>
  .chat-main-content .msg-link {
    color: #BA1B21;
    text-decoration: underline;
  }
</style>

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
          overflow: hidden;
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
        .chat-title-members {
          display: block;
          position: absolute;
          left: 80px;
          bottom: 15px;
          height: 20px;
          line-height: 20px;
          white-space: nowrap;
          font-size: 18px;
          color: #999999;
          cursor: pointer;
          span {
            display: inline-block;
            transition: transform .1s linear;
          }
          &.show {
            span {
              transform: rotate(180deg);
            }
          }
        }
      }
      .chat-main {
        position: relative;
        flex: 1 1 200px;
        overflow: hidden;
        .headimage {
          height: 40px;
          width: 40px;
          border-radius: 20px;
          overflow: hidden;
        }
        .chat-member-list {
          display: block;
          margin: 0;
          padding: 0 40px 0 0;
          position: absolute;
          z-index: 2;
          background: rgba(255, 255, 255, .9);
          left: 0;
          right: -40px;
          overflow-y: auto;
          line-height: 100px;
          border-width: 1px;
          border-color: #D9D9D9;
          border-style: solid none solid none;
          transition: height .3s linear;
          &:hover {
            padding: 0;
            right: 0;
          }
          .chat-member {
            list-style: none;
            display: inline-flex;
            vertical-align: top;
            padding: 0;
            margin: 10px 21px;
            height: 80px;
            width: 70px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .headimage {
              height: 50px;
              width: 50px;
              border-radius: 25px;
            }
            &:hover p {
              opacity: .8;
            }
            p {
              width: 70px;
              margin-top: 5px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .btn-add-member {
              height: 60px;
              width: 60px;
              background: #DFDFDF;
              border-radius: 4px;
              color: #FFFFFF;
              cursor: pointer;
              &:hover {
                opacity: .8;
              }
              i {
                display: block;
                margin: 0 auto;
                text-align: center;
                height: 60px;
                line-height: 60px;
              }
            }
          }
        }
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
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
              .headimage {
                flex: 0 0 40px;
                margin: 0 5px;
              }
              .chat-main-content {
                p {
                  background: #F0F0F0;
                  padding: 5px;
                  border-radius: 3px;
                  display: inline-block;
                  word-break: break-all;
                  word-wrap:break-word;
                  text-align: left;
                }
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

.filter-tree {
  margin-top: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>