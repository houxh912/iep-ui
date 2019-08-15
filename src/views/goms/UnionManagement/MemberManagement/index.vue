<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟成员"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-select v-model="assetOrgId" size="small" autocomplete="off" prefix-url="admin/org/i_can/all" placeholder="请选择组织" clearable @change="loadPage"></iep-select>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="realName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.realName}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleRole(scope.row)" type="warning" plain>修改角色</iep-button>
              <iep-button @click="handleResetPass(scope.row)">重置密码</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <detail-drawer ref="DetailDrawer"></detail-drawer>
    <role-dialog-form ref="RoleDialogForm"></role-dialog-form>
  </div>
</template>
<script>
import { getUserPage, putUnionRoleUpdate, getUnionRoleByUserId } from '@/api/goms/union'
import { resetPassByUserId } from '@/api/admin/user'
import mixins from '@/mixins/mixins'
import { initForm } from './options'
import { dictsMap } from '@/views/hrms/EmployeeProfile/options'
import DetailDrawer from '@/views/hrms/EmployeeProfile/Page/DetailDrawer.vue'
import RoleDialogForm from './RoleDialogForm'
export default {
  mixins: [mixins],
  components: { DetailDrawer, RoleDialogForm },
  data () {
    return {
      dictsMap,
      assetOrgId: null,
      columnsMap: [
        {
          prop: 'staffNo',
          label: '工号',
        },
        {
          prop: 'phone',
          label: '手机',
        },
        {
          prop: 'assetOrg',
          label: '资产所属',
          width: '300px',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async handleRole (row) {
      const { data } = await getUnionRoleByUserId(row.userId)
      this.$refs['RoleDialogForm'].form = this.$mergeByFirst(initForm(), data.data)
      this.$refs['RoleDialogForm'].formRequestFn = putUnionRoleUpdate
      this.$refs['RoleDialogForm'].dialogShow = true
    },
    handleResetPass (row) {
      this._handleComfirm(row.userId, resetPassByUserId, '重置密码为123456')
    },
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.userId
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable({ ...param, assetOrgId: this.assetOrgId }, getUserPage)
    },
  },
}
</script>
