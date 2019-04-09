<template>
  <div class="multiple-box">
    <el-tag type="info" closable v-for="tag in users" :key="tag.id" @close="handleClose(tag)">{{tag.name}}</el-tag>
    <el-popover placement="right" width="300" trigger="click" v-model="dialogShow">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" default-expand-all :show-checkbox="showCheckbox" :expand-on-click-node="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
          <span v-if="node.level===3">
            <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click.stop="() => selectGroup(data, node)">选择</el-button>
          </span>
        </span>
      </el-tree>
      <iep-button slot="reference">选择</iep-button>
    </el-popover>
  </div>
</template>
<script>
import { getUserListTree } from '@/api/admin/contacts'
export default {
  name: 'IepContactOneMultipleUser',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
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
  created () {
    this.loadNode()
  },
  methods: {
    isDisabled (data, node) {
      if (node.level === 3 && this.userIds.includes(data.value)) {
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
        this.dialogShow = false
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
