<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud :option="tableOption" :data="list" ref="crud" :page="page" v-model="form" :table-loading="listLoading" @on-load="getList" @search-change="handleFilter" @refresh-change="handleRefreshChange" @row-update="update" @row-save="create">
        <template slot="menuLeft">
          <el-button v-if="orgManager_btn_add" class="filter-item" @click="handleCreate" size="small" type="primary" icon="el-icon-edit">添加
          </el-button>
        </template>
        <template slot="dsScopeForm">
          <div v-if="form.dsType == 1">
            <el-tree class="filter-tree" :data="dsScopeData" :check-strictly="true" node-key="id" highlight-current :props="defaultProps" ref="scopeTree" :default-checked-keys="checkedDsScope" show-checkbox>
            </el-tree>
          </div>
        </template>

        <template slot-scope="scope" slot="name">
          <span>{{scope.row.name}}</span>
        </template>

        <template slot="menu" slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" v-if="orgManager_btn_edit" @click="handleUpdate(scope.row, scope.index)">编辑
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" v-if="orgManager_btn_del" @click="handleDelete(scope.row, scope.index)">删除
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-plus" @click="handlePerson(scope.row, scope.index)">成员
          </el-button>
          <el-dropdown v-if="scope.row.status===1" size="medium" @command="handleCommand($event, scope.row.orgId)">
            <span class="el-dropdown-link">
              <i class="el-icon-share"></i>
              审核<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pass">通过</el-dropdown-item>
              <el-dropdown-item command="reject">驳回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <review-person v-if="dialogVisible" :orgId="currentOrgId"></review-person>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchList,
  putObj,
  reviewById,
} from '@/api/admin/org'
import reviewPerson from './person'
import { tableOption } from '@/const/crud/admin/org'
import { mapGetters } from 'vuex'

export default {
  name: 'TableOrg',
  components: { reviewPerson },
  data () {
    return {
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      list: [],
      currentOrgId: 0,
      dialogVisible: false,
      listLoading: true,
      form: {},
      orgId: undefined,
      orgManager_btn_add: false,
      orgManager_btn_edit: false,
      orgManager_btn_del: false,
    }
  },
  created () {
    this.orgManager_btn_add = this.permissions['sys_org_add']
    this.orgManager_btn_edit = this.permissions['sys_org_edit']
    this.orgManager_btn_del = this.permissions['sys_org_del']
  },
  computed: {
    ...mapGetters(['elements', 'permissions']),
  },
  methods: {
    handlePerson (row) {
      this.dialogVisible = true
      this.currentOrgId = row.orgId
    },
    handleCommand (command, id) {
      reviewById(id, command).then(() => {
        this.getList(this.page)
      })
    },
    getList (page, params) {
      this.listLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      ).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleRefreshChange () {
      this.getList(this.page)
    },
    handleFilter (param) {
      this.page.page = 1
      this.getList(this.page, param)
    },
    handleCreate () {
      this.$refs.crud.rowAdd()
    },
    handleUpdate (row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handleDelete (row, index) {
      var _this = this
      this.$confirm(
        '是否确认删除名称为"' + row.orgName + '"' + '"的数据项?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(function () {
          return delObj(row.orgId)
        })
        .then(() => {
          this.getList(this.page)
          this.list.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
        })
        .catch(function () { })
    },
    create (row, done, loading) {
      addObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000,
          })
        })
        .catch(() => {
          loading()
        })
    },
    update (row, index, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(',')
      }
      putObj(this.form)
        .then(() => {
          this.getList(this.page)
          done()
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000,
          })
        })
        .catch(() => {
          loading()
        })
    },
  },
}
</script>
