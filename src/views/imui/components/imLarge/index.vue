<template>
  <div ref="imbox" class="im-box-large" :style="getPosition">
    <div class="drag" @mousedown="mousedown"></div>
    <div class="im-main">
      <div class="im-info">
        <div class="close-button" @click="showSmall"></div>
      </div>
      <ul class="im-table">
        <li :class="tableChosen === 'book' ? 'chosen' : ''" @click="tableChosen = 'book'">通讯录</li>
        <li :class="tableChosen === 'group' ? 'chosen' : ''" @click="tableChosen = 'group'">群聊</li>
        <li :class="tableChosen === 'chat' ? 'chosen' : ''" @click="tableChosen = 'chat'">
          <span>聊天</span>
          <el-badge class="unread-point" :max="99" v-show="$store.getters.imUnreadTotal" :value="$store.getters.imUnreadTotal">
          </el-badge>
        </li>
      </ul>
      <div class="im-tabel-content-large-im">
        <el-tree v-show="tableChosen === 'book'" @node-click="toChatUser" :data="$store.getters.imUserTree" node-key="id" :expand-on-click-node="false">
          <span v-if="data.leaf" class="im-tabel-content-large-im-item" slot-scope="{ node, data }">
            <span class="im-friend">
              <iep-img class="im-friend-head" :src="data.avatar ? data.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
              <span>{{data.label}}</span>
            </span>
          </span>
          <span v-else>{{ data.label }}</span>
        </el-tree>
        <ul v-show="tableChosen === 'chat'" class="im-chat-list">
          <li class="im-friend" v-for="chat in $store.getters.imChatList" @click="toChat(chat)" :key="chat.id">
            <iep-img class="im-friend-head" :src="chat.avatar ? chat.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
            <span>{{chat.realName}}</span>
            <el-badge class="unread-point" v-show="getImUnread(chat)" :max="99" :value="getImUnread(chat)"></el-badge>
          </li>
        </ul>
        <ul v-show="tableChosen === 'group'" class="im-chat-list">
          <li style="max-width: 260px;padding: 10px 0;text-align: center;">
            <el-button @click="openContact" class="btn-addgroup" size="mini" round>创建群聊+</el-button>
          </li>
          <li class="im-friend" v-for="group in $store.getters.imGroups" @click="toChatGroup(group)" :key="group.id">
            <iep-img class="im-friend-head" :src="group.avatar ? group.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
            <span>{{group.groupName}}</span>
          </li>
        </ul>
      </div>
    </div>
    <a-drawer :visible="dialogShow" title="通讯录" width="300" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" class="filter-tree" :filter-node-method="filterNode" :props="props" :data="$store.getters.imUserTree" :default-expanded-keys="[1]" node-key="value">
      <span v-if="node.value!==1" class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
        <span v-if="node.level===3">
          <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click="() => selectGroup(data)">选择</el-button>
        </span>
      </span>
      </el-tree>
      <div v-show="dialogShow" style="position: fixed;right: 300px;top: 0;bottom: 0;width: 300px;overflow-y: auto;background: #FFFFFF;padding: 20px;">
        <div style="text-align: center;">
          <iep-button @click.native="addGroup">确定</iep-button>
          <iep-button @click.native="clearGroup">重置</iep-button>
        </div>
        <div>
          <el-input v-model="newGroup.groupName" clearable></el-input>
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
import { createGroup } from '@/api/im'
export default {
  name: 'im-ui-large',
  data () {
    return {
      treeData: [],
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
      filterText: '',
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
      users: [],
      newGroup: {
        groupAvatar: '',
        groupName: '',
        membersId: [],
        originatorId: 0,
      },
    }
  },
  mounted () {
    this.boxWidth = this.$refs.imbox.offsetWidth
    this.boxHeight = this.$refs.imbox.offsetHeight
  },
  methods: {
    close () {
      this.filterText = ''
      this.dialogShow = false
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    openContact () {
      this.dialogShow = true
    },
    selectGroup (data) {
      this.users.push({
        userId: data.value,
        realName: data.label,
      })
      this.newGroup.membersId.push(data.value)
    },
    handleClose (index) {
      this.users.splice(index, 1)
      this.newGroup.membersId.splice(index, 1)
    },
    addGroup () {
      if (!this.newGroup.membersId.includes(this.$store.getters.userInfo.userId)) {
        this.newGroup.membersId.push(this.$store.getters.userInfo.userId)
      }
      createGroup(this.newGroup).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('创建成功！')
          this.dialogShow = false
          this.clearGroup()
        }
      }, error => {
        this.$message.error(error.msg)
      })
    },
    clearGroup () {
      this.users = []
      this.newGroup.membersId = []
      this.newGroup.groupName = ''
    },
    isDisabled (data, node) {
      if (node.level === 3 && this.newGroup.membersId.includes(data.value)) {
        return true
      }
      return false
    },
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
    toChatUser (data) {
      if (data.leaf) {
        this.chatChange({
          id: data.value,
          chatNo: `user${data.value}`,
          username: data.py,
          chatName: data.label,
          avatar: data.avatar,
          type: 1,
        })
      }
    },
    toChat (user) {
      this.chatChange({
        id: user.id,
        chatNo: `${user.type == 1 ? 'user' : 'group'}${user.id}`,
        username: user.username,
        chatName: user.realName,
        avatar: user.avatar,
        type: user.type,
      })
    },
    toChatGroup (group) {
      this.chatChange({
        id: group.id,
        chatNo: `group${group.id}`,
        username: group.groupName,
        chatName: group.groupName,
        avatar: group.avatar,
        type: 2,
      })
    },
    chatChange (chat) {
      this.$store.dispatch('updateCurrentChat', {chat, show: true})
    },
    getImUnread (user) {
      return this.$store.getters.imUnread(user.chatNo)
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
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>

<style scoped>
.im-tabel-content-large-im >>> .el-tree-node__content {
  height: auto;
}
.im-tabel-content-large-im
  >>> .is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
  display: none;
}
</style>

<style lang="scss" scoped>
.im-box-large {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 260px;
  background: #ffffff;
  border-radius: 2px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .btn-addgroup {
    margin: 5px 0;
    background: #ba1b21;
    color: #FFFFFF;
    &:hover {
      opacity: .8;
    }
  }
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        position: relative;
        flex: 1 1 100px;
        text-align: center;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        &.chosen:after {
          position: absolute;
          content: "";
          bottom: -2px;
          left: 0;
          right: 0;
          border-bottom: 2px solid #ba1b21;
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
          content: "";
          height: 2px;
          width: 10px;
          background: #aaaaaa;
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
        background: #f5f7fa;
      }
      .im-friend-head {
        position: absolute;
        left: 15px;
        top: 8px;
        height: 36px;
        width: 36px;
        border-radius: 18px;
        overflow: hidden;
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
        color: #dfdfdf;
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
        overflow: hidden;
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
        color: #dfdfdf;
        font-size: 12px;
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
