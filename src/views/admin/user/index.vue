<template>
  <div>
    <basic-container>
      <iep-page-header title="用户管理"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="realName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <iep-tag-detail iep-type="role" :value="scope.row.roleList.map(m => m.name)"></iep-tag-detail>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="sys_user_edit" type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleResetPass(scope.row)">重置密码</el-dropdown-item>
                  <el-dropdown-item @click.native="handleCreateFinance(scope.row)">生成财富</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { dictsMap, columnsMap, initMemberForm } from './options'
import { fetchList, putUser, resetPassByUserId } from '@/api/admin/user'
import { getCreateFinanceByUserId } from '@/api/fams/financial_management'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      sys_user_add: false,
      sys_user_edit: false,
      sys_user_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.sys_user_add = this.permissions['sys_user_add']
    this.sys_user_edit = this.permissions['sys_user_edit']
    this.sys_user_del = this.permissions['sys_user_del']
    this.loadPage()
  },
  methods: {
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initMemberForm(), row)
      this.$refs['DialogForm'].form.roleList = this.$refs['DialogForm'].form.roleList.map(m => m.id)
      this.$refs['DialogForm'].methodName = '编辑'
      this.$refs['DialogForm'].formRequestFn = putUser
      this.$refs['DialogForm'].disabled = false
      this.$refs['DialogForm'].dialogShow = true
    },
    handleCreateFinance (row) {
      this._handleComfirm(row.userId, getCreateFinanceByUserId, '为此用户生成财富账户')
    },
    handleResetPass (row) {
      this._handleComfirm(row.userId, resetPassByUserId, '重置密码为123456')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.userId)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, fetchList)
    },
  },
}
</script>