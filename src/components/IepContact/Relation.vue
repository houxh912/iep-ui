<template>
  <div>
    <div class="tab-title">我的关系</div>
    <el-tree ref="tree" class="filter-tree" :props="props" :data="treeData" :default-expanded-keys="[1]" node-key="value">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span @click="() => selectUser(data, node)">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { getRelationList } from '@/api/wel/relationship_manage'
export default {
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
    selectUser (data, node) {
      if (node.level === 3) {
        this.$emit('set-user', {
          id: data.id,
          name: data.name,
        })
      }
    },
    loadPage () {
      getRelationList().then(({ data }) => {
        this.treeData = [
          {
            id: 1,
            name: '自定义分组',
            userList: data.data,
          },
        ]
      })
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
