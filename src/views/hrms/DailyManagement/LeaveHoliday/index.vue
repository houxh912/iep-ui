<template>
  <div>
    <basic-container>
      <iep-page-header title="请假调休" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleDownload" icon="el-icon-download" type="primary" plain>导出全部</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="120px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="120px">
          <template>
            <iep-button type="warning" plain size="small" :disabled="true">分享</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getAdministrativeApprovalPage } from '@/api/hrms/administrative_approval'
import { postAppprovalExcelExport } from '@/api/hrms/excel'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { dictsMap, columnsMap } from './options'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0],
      replaceText: (data) => `（本周新增${data[0]}条请假申请，${data[1]}条出差申请，${data[2]}条转正申请，${data[3]}条加班申请，${data[4]}条调岗申请，${data[5]}条调离职申请）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    handleDownload () {
      postAppprovalExcelExport(this.searchForm)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getAdministrativeApprovalPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
