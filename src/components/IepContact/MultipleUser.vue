<template>
  <div class="multiple-box">
    <el-tag type="success" closable v-for="tag in users" :key="tag.id" @close="handleClose(tag)">{{tag.name}}</el-tag>
    <el-popover placement="right" width="300" trigger="click" v-model="dialogShow">
      <el-tree ref="tree" :props="props" :load="loadNode" :show-checkbox="showCheckbox" :expand-on-click-node="true" :filter-node-method="filterNodeMethod" lazy>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="node.level===3">
            <el-button type="text" size="mini" @click.stop="() => selectGroup(data, node)">
              选择
            </el-button>
          </span>
        </span>
      </el-tree>
      <iep-button slot="reference">选择</iep-button>
    </el-popover>
  </div>
</template>
<script>
import { getUnionList, getOrgListById, getUserListById } from '@/api/admin/contacts'
export default {
  name: 'IepContactMultipleUser',
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
    users: {
      handler: function (newVal) {
        this.$refs.tree.filter(newVal)
      },
      deep: true,
    },
  },
  methods: {
    handleClose (tag) {
      const newData = this.users.filter(item => item.id !== tag.id)
      this.users = newData
    },
    filterNodeMethod (value, data, node) {
      if (node.level === 3 && this.userIds.includes(data.value)) {
        return false
      }
      return true
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
    loadNode (node, resolve) {
      if (node.level === 0) {
        getUnionList().then(({ data }) => {
          resolve(data.data)
        })
      }
      if (node.level === 1) {
        getOrgListById(node.data.value).then(({ data }) => {
          resolve(data.data)
        })
      }
      if (node.level === 2) {
        getUserListById(node.data.value).then(({ data }) => {
          resolve(data.data)
        })
      }
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
