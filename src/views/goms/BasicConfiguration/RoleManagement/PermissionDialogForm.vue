<template>
  <iep-dialog :title="`<${title}>分配权限`" :dialog-show="dialogShow" width="520px" @close="close">
    <el-tree :data="treeData" :default-checked-keys="checkedKeys" :check-strictly="false" node-key="id" highlight-current :props="defaultProps" show-checkbox ref="menuTree" :filter-node-method="filterNode">
    </el-tree>
    <div slot="footer">
      <iep-button type="primary" @click="updatePermession()">更 新</iep-button>
    </div>
  </iep-dialog>
</template>
<script>
import {
  fetchRoleTree,
  permissionUpd,
} from '@/api/admin/role'
import { fetchMenuTree } from '@/api/admin/menu'
export default {
  data () {
    return {
      title: '',
      dialogShow: false,
      treeData: [],
      checkedKeys: [],
      defaultProps: {
        label: 'name',
        value: 'id',
      },
      menuIds: '',
      roleId: undefined,
    }
  },
  methods: {
    updatePermession () {
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree
        .getCheckedKeys()
        .join(',')
        .concat(',')
        .concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
      permissionUpd(this.roleId, this.menuIds).then(() => {
        fetchMenuTree()
          .then(response => {
            this.form = response.data.data
            return fetchRoleTree(this.roleId)
          })
          .then(response => {
            this.checkedKeys = response.data
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000,
            })
            this.close()
          })
      })
    },
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
  },
}
</script>
