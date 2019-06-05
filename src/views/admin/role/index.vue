<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <page-header title="角色管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="roleManager_btn_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>添加角色
          </iep-button>
        </template>
        <template slot="right">
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <div v-if="form.dsType == 1">
          <el-tree :data="dsScopeData" check-strictly node-key="id" highlight-current :props="defaultProps" ref="scopeTree" :default-checked-keys="checkedDsScope" show-checkbox>
          </el-tree>
        </div>
        <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetails(scope.row)" plain>查看
              </iep-button>
              <iep-button v-if="roleManager_btn_edit" @click="handleEdit(scope.row)" plain>编辑
              </iep-button>
              <iep-button v-if="roleManager_btn_del" @click="handleDeleteById(scope.row)" plain>删除
              </iep-button>
              <iep-button @click="handlePermission(scope.row, scope.index)" v-if="roleManager_btn_perm" plain>权限
              </iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <permission-dialog-form ref="PermissionDialogForm" @load-page="loadPage"></permission-dialog-form>
    <!-- <iep-dialog title="分配权限" :dialog-show="dialogPermissionVisible" width="520px" @close="loadPage">
      <el-tree :data="treeData" :default-checked-keys="checkedKeys" :check-strictly="false" node-key="id" highlight-current :props="defaultProps" show-checkbox ref="menuTree" :filter-node-method="filterNode" default-expand-all>
      </el-tree>
      <div slot="footer">
        <iep-button type="primary" @click="updatePermession(roleId, roleCode)">更 新</iep-button>
      </div>
    </iep-dialog> -->
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  getObj,
  fetchList,
  fetchRoleTree,
  putObj,
} from '@/api/admin/role'
import { fetchMenuTree } from '@/api/admin/menu'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initMemberForm } from './options'
import DialogForm from './DialogForm'
import PermissionDialogForm from './PermissionDialogForm'

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
      roleManager_btn_add: false,
      roleManager_btn_edit: false,
      roleManager_btn_del: false,
      roleManager_btn_perm: false,
    }
  },
  created () {
    this.loadPage()
    this.roleManager_btn_add = this.permissions['sys_role_add']
    this.roleManager_btn_edit = this.permissions['sys_role_edit']
    this.roleManager_btn_del = this.permissions['sys_role_del']
    this.roleManager_btn_perm = this.permissions['sys_role_perm']
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putObj
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDetails (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].methodName = '查看'
      this.$refs['DialogForm'].formRequestFn = getObj
      this.$refs['DialogForm'].dialogShow = true
    },
    handlePermission (row) {
      fetchRoleTree(row.roleId)
        .then(response => {
          this.$refs['PermissionDialogForm'].checkedKeys = response.data
          return fetchMenuTree()
        })
        .then(response => {
          this.$refs['PermissionDialogForm'].treeData = response.data.data
          // 解析出所有的太监节点
          this.$refs['PermissionDialogForm'].checkedKeys = this.resolveAllEunuchNodeId(
            this.$refs['PermissionDialogForm'].treeData,
            this.$refs['PermissionDialogForm'].checkedKeys,
            []
          )
          this.$refs['PermissionDialogForm'].dialogPermissionVisible = true
          this.$refs['PermissionDialogForm'].roleId = row.roleId
          this.$refs['PermissionDialogForm'].roleCode = row.roleCode
        })
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
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
      this._handleGlobalDeleteById(row.id, delObj)
    },
  },
}
</script>
