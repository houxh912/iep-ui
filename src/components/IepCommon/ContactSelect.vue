<template>
  <div style="display: flex;">
    <el-input v-model="user.name" placeholder="请输入选择用户" readonly @focus="handleShowContact"></el-input>
    <el-input v-show="false" v-model="user.id" placeholder="请输入内容"></el-input>
    <el-popover placement="right" width="400" trigger="click">
      <el-tree :props="props" :load="loadNode" lazy :show-checkbox="showCheckbox" @node-click="selectUser">
      </el-tree>
      <el-button slot="reference">添加</el-button>
    </el-popover>
  </div>
</template>
<script>
import { getUnionList, getOrgListById, getUserListById } from '@/api/admin/contacts'
export default {
  props: {
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: [String, Number],
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      user: {
        id: this.userId,
        name: this.userName,
      },
      dialogShow: false,
      props: {
        isLeaf: 'leaf',
      },
    }
  },
  methods: {
    selectUser (data, node) {
      if (node.level === 3) {
        this.user.id = data.value
        this.user.name = data.label
        this.dialogShow = false
      }
    },
    handleShowContact () {
      this.dialogShow = true
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
  watch: {
    user: {
      handler (n) {
        this.$emit('change', n)
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
