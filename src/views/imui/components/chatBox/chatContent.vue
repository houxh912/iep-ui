<template>
  <div class="chat-content">
    <div class="chat-box">
      <div class="chat-group">
        <div class="chat-title">
          <iep-img class="chat-title-head" :src="chatDetail.avatar ? chatDetail.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
          <p class="chat-title-name">
            <span v-show="!nameModify">{{chatDetail.chatName}}</span>
            <template v-if="chatDetail.type == 2">
              <input v-show="nameModify" ref="chatName" :value="chatDetail.chatName" @blur="modifyName" />
              <i v-show="!nameModify" @mousedown.prevent.stop="" @click.prevent.stop="toModifyName" class="iconfont icon-iconset0136"></i>
              <i v-if="chatDetail.originatorId === $store.getters.userInfo.userId" @mousedown.prevent.stop="" @click.prevent.stop="removeGroup" class="iconfont icon-jiesan"></i>
              <i v-else @mousedown.prevent.stop="" @click.prevent.stop="leaveGroup" class="iconfont icon-tuichu1"></i>
            </template>
          </p>
          <p v-if="chatDetail.type == 2" class="chat-title-members" :class="{show : membersShow}" @click="membersShow = !membersShow">
            {{groupMembers.length}}人
            <span>
              <i class="icon iconfont icon-arrow-down"></i>
            </span>
          </p>
        </div>
        <div class="chat-main">
          <ul v-if="chatDetail.type == 2" :style="getHeightStyle" v-show="membersShow" class="chat-member-list">
            <li class="chat-member" v-show="!doDelete || member.membersId !== chatDetail.originatorId" v-for="member in groupMembers" :key="'list' + member.membersId" @click="toChat(member)">
              <iep-img class="headimage" :src="member.avatar"></iep-img>
              <p>{{member.realName}}</p>
              <div v-show="doDelete" class="chat-member-option" @click.stop="checkDeleteList(member.membersId)">
                <i v-show="deleteList.includes(member.membersId)" class="icon iconfont icon-chenggong3"></i>
                <div class="not-check" v-show="!deleteList.includes(member.membersId)"></div>
              </div>
            </li>
            <li class="chat-member" v-show="!doDelete" style="cursor: auto">
              <div @click="toDoAdd" class="btn-add-member">
                <i class="icon iconfont icon-xinzeng" style="font-size: 30px;"></i>
              </div>
            </li>
            <li v-if="chatDetail.originatorId === $store.getters.userInfo.userId" class="chat-member" style="cursor: auto">
              <div @click="toDoDelete" class="btn-add-member">
                <i class="icon iconfont icon-jianshao" style="font-size: 30px;"></i>
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
              <li v-for="message in messageList" :key="'msg' + message.id" :style="getDirectionStyle(message.sendOrReceive)">
                <img class="headimage" :src="message.avatar ? message.avatar : '/img/icons/apple-touch-icon-60x60.png'" />
                <div class="chat-main-content">
                  <span>{{message.time}}</span><br>
                  <p>
                    <span v-if="message.messageType === '1' || message.messageType === 1">{{messageFormat(message.message)}}</span>
                    <media-content v-if="isMediaContent(message.messageType)" :url="message.message" :type="message.messageType"></media-content>
                    <file-loader :name="message.message" v-if="message.messageType === '5' || message.messageType === 5">文件</file-loader>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="chat-footer">
          <div>
            <el-upload :headers="headers" :action="action" :showFileList="false" :on-success="imageUpload" accept="image/*" class="btn-media">
              <i slot="trigger" class="el-icon-picture-outline"></i>
            </el-upload>
            <el-upload :headers="headers" :action="action" :showFileList="false" :on-success="fileUpload" class="btn-media">
              <i slot="trigger" class="el-icon-folder"></i>
            </el-upload>
            <el-upload :headers="headers" :action="action" :showFileList="false" :on-success="audioUpload" accept="audio/mpeg, video/mp4" class="btn-media">
              <i slot="trigger" class="el-icon-headset"></i>
            </el-upload>
            <el-upload :headers="headers" :action="action" :showFileList="false" :on-success="videoUpload" accept="video/mp4" class="btn-media">
              <i slot="trigger" class="el-icon-film"></i>
            </el-upload>
          </div>
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
        <el-tag style="margin: 5px;" :key="'pre' + member.membersId" v-for="(member) in groupMembers" :disable-transitions="false">
          {{member.realName}}
        </el-tag>
        <el-tag style="margin: 5px;" :key="'current' + user.userId" v-for="(user, index) in users" closable :disable-transitions="false" @close="handleClose(index)">
          {{user.realName}}
        </el-tag>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { getMoreHistory, updateGroupMember } from '@/api/im'
import fileLoader from './fileLoader.vue'
import mediaContent from './mediaContent.vue'
const urlReg = new RegExp('((http(s)?:\\/\\/)?(\\w+\\.)+(com|net|org|cn|xin|top|cc|online)(\\/(\\w)*)*)', 'gi')

export default {
  name: 'chat-content',
  components: {
    fileLoader,
    mediaContent,
  },
  data () {
    return {
      action: '/api/ims/im/file/upload',
      headers: {
        Authorization: 'Bearer ' + this.$store.getters.access_token,
      },
      message: '',
      loadingMore: false,
      messageList: [],
      messageNew: '',
      membersShow: false,
      dialogShow: false,
      doDelete: false,
      deleteList: [],
      props: {
        isLeaf: 'leaf',
      },
      filterText: '',
      users: [],
      membersId: [],
      imgsrc: '',
      nameModify: false,
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
    checkDeleteList (id) {
      if (!this.deleteList.includes((id))) {
        this.deleteList.push(id)
      } else {
        for (let i = 0; i < this.deleteList.length; i++) {
          if (this.deleteList[i] === id) {
            this.deleteList.splice(i, 1)
            return
          }
        }
      }
    },
    toDoAdd () {
      this.dialogShow = true
    },
    toDoDelete () {
      if (this.doDelete) {
        if (this.deleteList.length > 0) {
          let group = {
            groupId: this.chatDetail.id,
            type: 1,
            partiesType: 6,
            ids: Object.assign([], this.deleteList),
          }
          this.$confirm(`确认移除所选${this.deleteList.length}位群成员？`).then(() => {
            updateGroupMember(group).then(({ data }) => {
              if (data.code === 0) {
                this.doDelete = false
                this.deleteList = []
              }
            }, error => {
              this.$message.error(error.msg)
            })
          })
        } else {
          this.doDelete = false
        }
      } else {
        this.doDelete = true
      }
    },
    removeGroup () {
      this.$confirm('确认解散该群？').then(() => {
        this.$store.dispatch('removeGroup', this.chatDetail.id).then(() => {
          this.closeChat()
        })
      })
    },
    leaveGroup () {
      this.$confirm('确认退出该群？').then(() => {
        let group = {
          groupId: this.chatDetail.id,
          type: 1,
          partiesType: 6,
          ids: [this.$store.getters.userInfo.userId],
        }
        updateGroupMember(group).then(({ data }) => {
          if (data.code === 0) {
            this.closeChat()
          }
        }, error => {
          this.$message.error(error.msg)
        })
      })
    },
    isMediaContent (type) {
      return [2, 3, 4, '2', '3', '4'].includes(type)
    },
    toModifyName () {
      this.nameModify = true
      this.$nextTick(() => {
        this.$refs.chatName.focus()
        this.$refs.chatName.select()
      })
    },
    modifyName () {
      let groupName = this.$refs.chatName.value.replace(/(^\s*)|(\s*$)/g, '')
      if (groupName !== this.chatDetail.chatName) {
        let id = this.chatDetail.id
        this.$store.dispatch('updateGroupInfo', { id, groupName }).then(() => {
          this.nameModify = false
          this.$message.success('修改成功！')
        }, (error) => {
          this.$message.error(error.msg)
        })
      } else {
        this.nameModify = false
      }
    },
    imageUpload (response) {
      this.sendFile(response.data.bucketName + '-' + response.data.fileName, 2)
    },
    videoUpload (response) {
      this.sendFile(response.data.bucketName + '-' + response.data.fileName, 3)
    },
    audioUpload (response) {
      this.sendFile(response.data.bucketName + '-' + response.data.fileName, 4)
    },
    fileUpload (response) {
      this.sendFile(response.data.bucketName + '-' + response.data.fileName, 5)
    },
    sendFile (fileName, type) {
      this.$emit('sendMessage', { receiver: this.chatDetail, message: fileName, messageType: type })
    },
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
      updateGroupMember(group).then(({ data }) => {
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
      if (node.level === 3 && (this.membersId.includes(data.value) || this.groupMembersId.includes(data.value))) {
        return true
      }
      return false
    },
    messageFormat (message) {
      return message.replace(urlReg, '<a class="msg-link" href="//$1" target="_blank">$1</a>')
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
        this.$emit('sendMessage', { receiver: this.chatDetail, message: this.message, messageType: 1 })
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
      }).then(({ data }) => {
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
      this.$store.dispatch('updateCurrentChat', { chat, show: true })
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
      let height = this.groupMembers.length > (this.chatDetail.originatorId === this.$store.getters.userInfo.userId ? 3 : 4) ? '202px' : '102px'
      return {
        height: this.membersShow ? height : '0px',
      }
    },
    groupMembersId () {
      let ids = []
      for (let i = this.groupMembers.length; i--;) {
        ids.push(this.groupMembers[i].membersId)
      }
      return ids
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
  color: #ba1b21;
  text-decoration: underline;
}
.btn-media {
  display: inline-block;
  padding: 5px 10px;
  font-size: 20px;
}
.el-tag {
  border-style: none;
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
          height: 24px;
          white-space: nowrap;
          font-size: 18px;
          span {
            margin-right: 10px;
            display: inline-block;
            height: 24px;
            line-height: 24px;
          }
          input {
            margin-right: 10px;
            height: 24px;
            line-height: 24px;
            width: 100px;
            padding: 0 10px;
            font-size: 16px;
            border-style: none;
            outline-style: none;
          }
          i {
            margin-left: 10px;
            &:hover {
              color: $--color-primary;
            }
          }
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
            transition: transform 0.1s linear;
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
          background: rgba(255, 255, 255, 0.9);
          left: 0;
          right: -40px;
          overflow-y: auto;
          line-height: 100px;
          border-width: 1px;
          border-color: #d9d9d9;
          border-style: solid none solid none;
          transition: height 0.3s linear;
          &:hover {
            padding: 0;
            right: 0;
          }
          .chat-member {
            position: relative;
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
              opacity: 0.8;
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
              margin-bottom: 0;
            }
            .btn-add-member {
              height: 60px;
              width: 60px;
              background: #dfdfdf;
              border-radius: 4px;
              color: #ffffff;
              cursor: pointer;
              &:hover {
                opacity: 0.8;
              }
              i {
                display: block;
                margin: 0 auto;
                text-align: center;
                height: 60px;
                line-height: 60px;
              }
            }
            .chat-member-option {
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1;
              .icon-chenggong3 {
                font-size: 20px;
                color: $--color-primary;
              }
              .not-check {
                height: 20px;
                width: 20px;
                border: 1px solid $--color-primary;
                border-radius: 10px;
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
          background: rgba(186, 27, 33, 0.8);
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
                color: $--color-primary;
              }
              .headimage {
                flex: 0 0 40px;
                margin: 0 5px;
              }
              .chat-main-content {
                p {
                  background: #f0f0f0;
                  padding: 5px;
                  border-radius: 3px;
                  display: inline-block;
                  word-break: break-all;
                  word-wrap: break-word;
                  text-align: left;
                }
              }
            }
          }
        }
      }
      .chat-footer {
        flex: 0 0 110px;
        border-top: 1px solid #eeeeee;
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
              background: $--color-primary;
              cursor: pointer;
              color: #ffffff;
              &:hover {
                opacity: 0.8;
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
