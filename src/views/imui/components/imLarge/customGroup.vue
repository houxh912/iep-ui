<template>
  <el-tree @node-click="toChatUser" :data="$store.getters.imCustomGroups" node-key="id" :expand-on-click-node="false">
    <div v-if="data.leaf" class="im-friend" slot-scope="{ node, data }">
      <iep-img class="im-friend-head" :src="data.avatar ? data.avatar : '/img/icons/apple-touch-icon-60x60.png'"></iep-img>
      <span>{{data.label}}</span>
    </div>
      <div v-else style="max-width: 235px">{{ data.label }}</div>
  </el-tree>
</template>

<script>
export default {
  name: 'custom-group',
  methods: {
    toChatUser (data) {
      if (data.leaf) {
        let chat = {
          id: data.value,
          chatNo: `user${data.value}`,
          username: data.py,
          chatName: data.label,
          avatar: data.avatar,
          type: 1,
        }
        this.$store.dispatch('updateCurrentChat', {chat, show: true})
      }
    },
  },
}
</script>

<style scoped>
  >>> .el-tree-node__content {
    max-width: 260px;
    height: auto;
  }
  >>> .is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
    display: none;
  }
</style>

<style lang="scss" scoped>
  .im-friend {
    display: block;
    box-sizing: border-box;
    height: 52px;
    max-width: 242px;
    width: 100%;
    padding: 5px 15px 5px 60px;
    cursor: pointer;
    position: relative;
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
    .icon-liebiao {
      position: absolute;
      right: 20px;
      height:40px;
      line-height: 40px;
      top: 6px;
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