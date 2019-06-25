<template>
  <div>
    <basic-container>
      <iep-statistics-header title="项目核算" :dataMap="financialData">
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
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
        <el-table-column label="应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.projectIncome ? '暂无' : (scope.row.projectIncome||0 - scope.row.invoiceAmount||0) }}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getProjectPage, getProjectPageByOrgId } from '@/api/fams/statistics'
import IepStatisticsHeader from '@/views/fams/Components/StatisticsHeader'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  components: { IepStatisticsHeader },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0],
    }
  },
  computed: {
    id () {
      return +this.$route.query.id
    },
    financialData () {
      return {
        '项目总金额': this.statistics[0],
        '到账总金额': this.statistics[1],
        '未到账总金额': this.statistics[2],
        '开票总金额': this.statistics[3],
        '未开票总金额': this.statistics[4],
        '应收账款': this.statistics[5],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchParam) {
      const pageFunction = this.id ? getProjectPageByOrgId(this.id) : getProjectPage
      const data = await this.loadTable(param, pageFunction)
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
