<template>
  <div>
    <basic-container>
      <iep-page-header title="角色管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="goms_role_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>添加角色</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="roleName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="角色名称">
            <template slot-scope="scope">
              <div>{{scope.row.roleName}}
                <a-tag v-if="scope.row.unionId!==0" color="red">联盟赋予</a-tag>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button v-if="goms_role_edit" @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="goms_role_del" @click="handleDeleteById(scope.row)">删除</iep-button>
              <iep-button @click="handlePermission(scope.row, scope.index)" v-if="goms_role_perm">权限</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <permission-dialog-form ref="PermissionDialogForm" @load-page="loadPage"></permission-dialog-form>
  </div>
</template>

<script>
import {
  postOrgObj,
  delObj,
  getObj,
  getOrgRolePage,
  fetchRoleTree,
  putObj,
} from '@/api/admin/role'
import { getModuleMenuTree } from '@/api/admin/menu'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initForm, orgDsType } from './options'
import DialogForm from './DialogForm'
import PermissionDialogForm from './PermissionDialogForm'
function filterTree (arr, selectedKey) {
  return arr.filter(item => !selectedKey.includes(item.id)).map(item => {
    item = Object.assign({}, item)
    if (item.children) {
      item.children = filterTree(item.children, selectedKey)
    }
    return item
  })
}
export default {
  name: 'TableRole',
  mixins: [mixins],
  components: {
    DialogForm,
    PermissionDialogForm,
  },
  data () {
    return {
      columnsMap,
      dictsMap,
      dsScopeData: [],
      checkedDsScope: [],
      defaultProps: {
        label: 'name',
        value: 'id',
      },
      form: {},
      rolesOptions: undefined,
      goms_role_add: false,
      goms_role_edit: false,
      goms_role_del: false,
      goms_role_perm: false,
    }
  },
  created () {
    this.loadPage()
    this.goms_role_add = this.permissions['goms_role_add']
    this.goms_role_edit = this.permissions['goms_role_edit']
    this.goms_role_del = this.permissions['goms_role_del']
    this.goms_role_perm = this.permissions['goms_role_perm']
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getOrgRolePage)
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postOrgObj
      this.$refs['DialogForm'].dsType = orgDsType
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].roleCodeDisabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].dsType = orgDsType
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].roleCodeDisabled = true
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].formRequestFn = getObj
      this.$refs['DialogForm'].dsType = orgDsType
      this.$refs['DialogForm'].disabled = true
      this.$refs['DialogForm'].roleCodeDisabled = true
      this.$refs['DialogForm'].dialogShow = true
    },
    handlePermission (row) {
      fetchRoleTree(row.roleId)
        .then(response => {
          this.$refs['PermissionDialogForm'].checkedKeys = response.data
          return getModuleMenuTree()
        })
        .then(response => {
          const treeData = response.data.data
          this.$refs['PermissionDialogForm'].treeData = filterTree(treeData, [8230, 8300, 8400, 10000])
          // 解析出所有的节点
          this.$refs['PermissionDialogForm'].checkedKeys = this.resolveAllEunuchNodeId(
            this.$refs['PermissionDialogForm'].treeData,
            this.$refs['PermissionDialogForm'].checkedKeys,
            []
          )
          this.$refs['PermissionDialogForm'].roleId = row.roleId
          this.$refs['PermissionDialogForm'].roleCode = row.roleCode
          this.$refs['PermissionDialogForm'].title = row.roleName
          this.$refs['PermissionDialogForm'].dialogShow = true
        })
    },
    /**
     * 解析出所有的节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 节点id数组
     */
    resolveAllEunuchNodeId (json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter(id => id === item.id))
        }
      }
      return temp
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData (data, done) {
      done()
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.roleId, delObj)
    },
  },
}
</script>
