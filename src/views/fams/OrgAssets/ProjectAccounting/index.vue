<template>
  <div>
    <basic-container>
      <page-header title="项目核算" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="projectName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="未开票金额">
          <template slot-scope="scope">
            {{!scope.row.amount ? '暂无' : (scope.row.amount||0 - scope.row.invoiceAmount||0) }}
          </template>
        </el-table-column>
        <el-table-column label="未到账金额">
          <template slot-scope="scope">
            {{!scope.row.amount ? '暂无' : (scope.row.amount||0 - scope.row.projectIncome||0) }}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getProjectPage } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0],
      replaceText: (data) => `（项目总金额：${data[0]}元，到账总金额：${data[1]}元，未到账总金额：${data[2]}元，开票总金额：${data[3]}元，未开票总金额：${data[4]}元，应收账款：${data[5]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchParam) {
      const data = await this.loadTable(param, getProjectPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/project_accounting/${row.id}`,
      })
    },
  },
}
</script>
<style scoped>
</style>
