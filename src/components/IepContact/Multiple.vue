<template>
  <div class="multiple-box">
    <operation-wrapper>
      <el-tag type="danger" :closable="!disabled" v-for="tag in unions" :key="tag.id+tag.name" @close="handleClose(tag, 'unions')">{{tag.name}}</el-tag>
      <el-tag type="warning" :closable="!disabled" v-for="tag in orgs" :key="tag.id+tag.name" @close="handleClose(tag, 'orgs')">{{tag.name}}</el-tag>
      <el-tag type="info" :closable="!disabled" v-for="tag in users" :key="tag.id+tag.name" @close="handleClose(tag, 'users')">{{tag.name}}</el-tag>
      <iep-button v-if="isClear && !disabled" icon="el-icon-error" @click="clearAll"></iep-button>
      <iep-button @click="dialogShow = true">选择</iep-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="dialogShow = false" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :props="props" :data="treeData" default-expand-all :expand-on-click-node="true" :filter-node-method="filterNode">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
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
  name: 'IepContactMultiple',
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
      type: Object,
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
    users: {
      get: function () { return this.group.users },
      set: function (value) { this.group.users = value },
    },
    userIds: function () { return this.group.users.map(m => m.id) },
    orgs: {
      get: function () { return this.group.orgs },
      set: function (value) { this.group.orgs = value },
    },
    orgIds: function () { return this.group.orgs.map(m => m.id) },
    unions: {
      get: function () { return this.group.unions },
      set: function (value) { this.group.unions = value },
    },
    unionIds: function () { return this.group.unions.map(m => m.id) },
    group: {
      get: function () { return this.value },
      set: function (value) { this.$emit('input', value) },
    },
    isClear () {
      if (this.unionIds.length) {
        return true
      }
      if (this.orgIds.length) {
        return true
      }
      if (this.userIds.length) {
        return true
      }
      return false
    },
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
  created () {
    this.loadNode()
  },
  methods: {
    clearAll () {
      this.unions = []
      this.orgs = []
      this.users = []
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    isDisabled (data, node) {
      if (node.level === 1 && this.unionIds.includes(data.value)) {
        return true
      }
      if (node.level === 2 && this.orgIds.includes(data.value)) {
        return true
      }
      if (node.level === 3 && (this.userIds.includes(data.value) || this.filterUserList.includes(data.value))) {
        return true
      }
      return false
    },
    handleClose (tag, arr) {
      const newData = this.group[arr].filter(item => item.id !== tag.id)
      this.group[arr] = newData
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
      if (node.level === 2) {
        if (!this.orgIds.includes(data.value)) {
          this.orgs.push({
            id: data.value,
            name: data.label,
          })
        }
      }
      if (node.level === 1) {
        if (!this.unionIds.includes(data.value)) {
          this.unions.push({
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
