<template>
  <div>
    <basic-container>
      <page-header title="员工"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="ID">
            <template slot-scope="scope">
              {{scope.row.userId}}
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.realName}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
    <detail-drawer ref="DetailDrawer"></detail-drawer>
  </div>
</template>
<script>
import { getUserPage } from '@/api/goms/union'
import mixins from '@/mixins/mixins'
import { dictsMap } from '@/views/hrms/EmployeeProfile/options'
import AdvanceSearch from './AdvanceSearch'
import DetailDrawer from './DetailDrawer'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, DetailDrawer },
  data () {
    return {
      dictsMap,
      columnsMap: [
        {
          prop: 'phone',
          label: '手机',
        },
        {
          prop: 'assetOrg',
          label: '资产所属',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.userId
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getUserPage)
    },
  },
}
</script>
