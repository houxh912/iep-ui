<template>
  <div>
    <basic-container>
      <iep-statistics-header :title="title" :dataMap="financialData">
        <template slot="left">
          <iep-tip icon="el-icon-question" content="回款率=到账金额/回款计划金额"></iep-tip>
        </template>
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
        <template slot="right">
          <operation-search @search-page="searchPage" prop="projectName" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="未到账金额">
          <template slot-scope="scope">
            {{!scope.row.contractAmount ? '暂无' : (scope.row.contractAmount||0 - scope.row.incomeAmount||0) }}
          </template>
        </el-table-column>
        <el-table-column label="回款率">
          <template slot-scope="scope">
            {{!scope.row.incomeAmount ? '暂无' : (scope.row.incomeAmount||0 / scope.row.paymentAmount||1) }}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getOrgPaymentPlanPage, getOrgPaymentPlanPageByOrgId } from '@/api/gpms/fas'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
import AdvanceSearch from './AdvanceSearch'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    title () {
      const { name } = this.$route.query
      return name ? `回款计划(${name})` : '回款计划'
    },
    financialData () {
      return {
        '计划回款': this.statistics[0],
        '到账金额': this.statistics[1],
        '未到账金额': this.statistics[2],
        '回款率(%)': this.statistics[3] || '-',
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchForm) {
      const pageFunction = this.id ? getOrgPaymentPlanPageByOrgId(this.id) : getOrgPaymentPlanPage
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
