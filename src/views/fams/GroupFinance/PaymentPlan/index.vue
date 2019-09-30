<template>
  <div>
    <basic-container>
      <iep-statistics-header title="回款计划-集团" :dataMap="financialData">
        <template slot="left">
          <iep-tip icon="el-icon-question" content="回款率=到账金额/回款计划金额"></iep-tip>
        </template>
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
        <template slot="right">
          <operation-search @search-page="searchPage">
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
import { getPaymentPlanPage } from '@/api/gpms/fas'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0],
    }
  },
  computed: {
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
      const data = await this.loadTable(param, getPaymentPlanPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/org_payment_plan/${row.orgId}`,
        query: {
          name: row.orgName,
        },
      })
    },
  },
}
</script>
<style scoped>
</style>
