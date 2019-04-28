<template>
  <div class="multiple-box">
    <operation-wrapper>
      <el-tag v-if="!users.length" type="info">无</el-tag>
      <el-tag type="info" :closable="!disabled" v-for="tag in users" :key="tag.id" @close="handleClose(tag)">{{tag.name}}</el-tag>
      <iep-button v-if="isClear && !disabled" icon="el-icon-error" @click="clearAll"></iep-button>
      <iep-button v-if="!disabled" @click="openContact()">选择</iep-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" default-expand-all :expand-on-click-node="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
          <span v-if="node.level===3">
            <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click.stop="() => selectGroup(data, node)">选择</el-button>
          </span>
        </span>
      </el-tree>
    </iep-drawer>
  </div>
</template>
<script>
import { getUserListTree } from '@/api/admin/contacts'
export default {
  name: 'IepContactMultipleUser',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    filterUserList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      filterText: '',
      treeData: [],
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
    }
  },
  computed: {
    isClear () {
      return this.userIds.length !== 0 ? true : false
    },
    users: {
      get: function () { return this.value },
      set: function (value) { this.$emit('input', value) },
    },
    userIds: function () { return this.value.map(m => m.id) },
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    close () {
      this.filterText = ''
      this.dialogShow = false
    },
    openContact () {
      this.dialogShow = true
      this.loadNode()
    },
    clearAll () {
      this.users = []
    },
    isDisabled (data, node) {
      if (node.level === 3 && (this.userIds.includes(data.value) || this.filterUserList.includes(data.value))) {
        return true
      }
      return false
    },
    handleClose (tag) {
      const newData = this.users.filter(item => item.id !== tag.id)
      this.users = newData
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectGroup (data, node) {
      if (node.level === 3) {
        if (!this.userIds.includes(data.value)) {
          this.users.push({
            id: data.value,
            name: data.label,
          })
        }
      }
    },
    loadNode () {
      getUserListTree().then(({ data }) => {
        this.treeData = data.data
      })
    },
  },
}
</script>
<style scoped>
.multiple-box > .el-tag {
  margin-right: 5px;
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
