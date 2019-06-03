<template>
  <div class="im-box" :style="getPosition()">
    <div class="drag" @mousedown="mousedown"></div>
    <div class="im-main">
      <div class="im-info">
        <div class="close-button" @click="showSmall"></div>
      </div>
      <ul class="im-table">
        <li :class="tableChosen === 'book' ? 'chosen' : ''" @click="tableChosen = 'book'">通讯录</li>
        <li :class="tableChosen === 'chat' ? 'chosen' : ''" @click="tableChosen = 'chat'">聊天</li>
      </ul>
      <!--<user-tree :userList="userList"></user-tree>-->
      <div class="im-tabel-content-large-im">
          <el-tree
                  @node-click="toChat"
                  :data="userList"
                  node-key="id"
                  :expand-on-click-node="false">
            <span v-if="data.leaf" class="im-tabel-content-large-im-item" slot-scope="{ node, data }">
              <span class="im-friend">
                <img class="im-friend-head" :src="data.avatar ? data.avatar : '/img/icons/apple-touch-icon-60x60.png'"/>
                <span>{{data.label}}</span>
              </span>
            </span>
            <span v-else>{{ data.label }}</span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserListTree } from '@/api/admin/contacts'
//import userTree from '../userTree/index.vue'
export default {
  name: 'im-ui-large',
  components: {
//    userTree,
  },
  data () {
    return {
      moveHorizontal: 0,
      moveVertical: 0,
      tableChosen: 'book',
      userList: [],
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    showSmall () {
      this.$emit('showSmall')
    },
    getUserList () {
      getUserListTree().then(({data}) => {
        this.userList = data.data
      })
    },
    getPosition () {
      return {
        right: this.moveHorizontal + 'px',
        bottom: this.moveVertical + 'px',
      }
    },
    mousedown () {
      document.body.style['user-select'] = 'none'
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    mousemove (event) {
      console.log(document.body.clientWidth - event.clientX)
    },
    mouseup () {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
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
  },
}
</script>

<style lang="scss">
.im-box {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 260px;
  background: #FFFFFF;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
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
          border-bottom: 2px solid #5DDC96;
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
    .el-tree-node__content {
      height: auto;
    }
    .is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
      display: none;
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