<template>
  <div>
    <basic-container>
      <iep-statistics-header :title="title" :dataMap="financialData">
        <template slot="left">
          <iep-tip icon="el-icon-question" content="项目金额=合同金额+待签金额<br/>
                            合同金额：已经签订合同的项目金额<br/>
                            待签金额：未签订合同的项目金额<br/>
                            开票金额：已经开发票的项目金额<br/>
                            应收账款金额：已经开发票的未到账的项目金额"></iep-tip>
        </template>
        <template slot="right">
          <operation-wrapper>
            <iep-button type="primary" @click="$openPage(`/fams_spa/org_payment_plan/0`)">查看回款计划</iep-button>
            <iep-button type="primary" @click="$openPage(`/fams_spa/business_indicator`)">本组织业务指标</iep-button>
          </operation-wrapper>
        </template>
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增业务指标</iep-button> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="projectName" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="未开票金额">
          <template slot-scope="scope">
            {{!scope.row.amount ? '暂无' : (scope.row.amount - (scope.row.invoicingAmount||0)) }}
          </template>
        </el-table-column>
        <el-table-column label="未到账金额">
          <template slot-scope="scope">
            {{!scope.row.amount ? '暂无' : (scope.row.amount - (scope.row.projectIncome||0)) }}
          </template>
        </el-table-column>
        <el-table-column label="应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.invoicingAmount ? '暂无' : (scope.row.invoicingAmount - (scope.row.projectIncome||0)) }}
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
import { columnsMap, initForm } from './options'
import AdvanceSearch from './AdvanceSearch'
function initStatistics () {
  return [0, 0, 0, 0, 0, 0, 0]
}
export default {
  components: { IepStatisticsHeader, AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: initStatistics(),
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    title () {
      const { name } = this.$route.query
      return name ? `项目核算(${name})` : '项目核算'
    },
    financialData () {
      return {
        '项目总金额': this.statistics[0],
        '历史项目金额': this.statistics[1],
        '到账总金额': this.statistics[2],
        '未到账总金额': this.statistics[3],
        '开票总金额': this.statistics[4],
        '未开票总金额': this.statistics[5],
        '应收账款': this.statistics[6],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchParam) {
      const pageFunction = this.id ? getProjectPageByOrgId(this.id) : getProjectPage
      const data = await this.loadTable(param, pageFunction)
      this.statistics = this.$fillStatisticsArray(initStatistics(), data.statistics)
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
