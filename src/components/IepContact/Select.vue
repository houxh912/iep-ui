<template>
  <el-input v-model="user.name" placeholder="请输入选择用户" readonly>
    <el-popover slot="append" placement="right" width="300" trigger="click" v-model="dialogShow">
      <el-tree :props="props" :load="loadNode" lazy :show-checkbox="showCheckbox" @node-click="selectUser"></el-tree>
      <iep-button slot="reference">选择</iep-button>
    </el-popover>
  </el-input>
</template>
<script>
import { getUnionList, getOrgListById, getUserListById } from '@/api/admin/contacts'
export default {
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
      props: {
        isLeaf: 'leaf',
      },
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
  methods: {
    selectUser (data, node) {
      if (node.level === 3) {
        this.user = {
          id: data.value,
          name: data.label,
        }
        this.dialogShow = false
      }
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        getUnionList().then(({ data }) => {
          return resolve(data.data)
        })
      }
      if (node.level === 1) {
        getOrgListById(node.data.value).then(({ data }) => {
          return resolve(data.data)
        })
      }
      if (node.level === 2) {
        getUserListById(node.data.value).then(({ data }) => {
          return resolve(data.data)
        })
      }
    },
  },
}
</script>
