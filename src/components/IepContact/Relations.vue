<template>
  <div>
    <div class="tab-title">我的关系</div>
    <el-tree ref="tree" class="filter-tree" :props="props" :data="treeData" :default-expanded-keys="[1]" node-key="value">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
        <span v-if="node.level===3">
          <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click="() => selectUser(data, node)">选择</el-button>
        </span>
        <span v-if="node.level===2">
          <el-button type="text" size="mini" @click="() => selectGroup(data, node)">全选</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { getRelationList, getMyMasterContactList, getMyApprenticeContactList } from '@/api/wel/relationship_manage'
export default {
  props: ['userIds', 'filterUserList'],
  data () {
    return {
      treeData: [],
      props: {
        label: 'name',
        value: 'id',
        children: 'userList',
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    isDisabled (data, node) {
      if (node.level === 3 && (this.userIds.includes(data.id) || this.filterUserList.includes(data.id))) {
        return true
      }
      return false
    },
    selectUser (data, node) {
      if (node.level === 3) {
        if (!this.userIds.includes(data.id)) {
          this.$emit('push', {
            id: data.id,
            name: data.name,
          })
        }
      }
    },
    selectGroup (data, node) {
      if (node.level === 2) {
        this.$emit('push-list', data.userList)
      }
    },
    async loadPage () {
      const relationList = (await getRelationList()).data.data
      const masterList = (await getMyMasterContactList()).data.data
      const apprenticeList = (await getMyApprenticeContactList()).data.data
      this.treeData = [
        {
          id: 1,
          name: '我的师徒',
          userList: [
            {
              id: 1,
              name: '我的师父',
              userList: masterList,
            },
            {
              id: 2,
              name: '我的徒弟',
              userList: apprenticeList,
            },
          ],
        },
        {
          id: 2,
          name: '自定义分组',
          userList: relationList,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-title {
  font-size: 16px;
  color: #3a3a3a;
  background-color: #eee;
  padding: 5px;
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
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
