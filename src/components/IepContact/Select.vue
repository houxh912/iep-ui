<template>
  <div>
    <el-input v-model="user.name" placeholder="请输入选择用户" @focus="dialogShow = true" readonly>
      <iep-button slot="reference">选择</iep-button>
    </el-input>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="20%" @close="dialogShow = false" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" :filter-node-method="filterNode" :props="props" :data="treeData" :show-checkbox="showCheckbox" default-expand-all @node-click="selectUser"></el-tree>
    </iep-drawer>
  </div>
</template>
<script>
import { getUserListTree } from '@/api/admin/contacts'
export default {
  name: 'IepContactSelect',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      dialogShow: false,
      filterText: '',
      props: {
        isLeaf: 'leaf',
      },
      treeData: [],
    }
  },
  computed: {
    user: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  created () {
    this.loadNode()
  },
  methods: {
    selectUser (data, node) {
      if (node.level === 3) {
        this.user = {
          id: data.value,
          name: data.label,
        }
        this.filterText = ''
        this.dialogShow = false
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadNode () {
      getUserListTree().then(({ data }) => {
        this.treeData = data.data
      })
    },
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>
