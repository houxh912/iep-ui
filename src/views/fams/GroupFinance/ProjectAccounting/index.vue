<template>
  <div>
    <basic-container>
      <iep-statistics-header title="项目核算-集团" :dataMap="financialData">
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增业务指标</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <template slot="before-columns">
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{scope.row.businessYear-scope.row.businessMonth}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.invoicingAmount ? '暂无' : (scope.row.invoicingAmount||0 - scope.row.projectIncome||0) }}
          </template>
        </el-table-column>
        <el-table-column label="业务指标完成率">
          <template slot-scope="scope">
            {{!scope.row.contractAmount ? '暂无' : (scope.row.contractAmount||0 / scope.row.amount||1) }}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import IepStatisticsHeader from '@/views/fams/Components/StatisticsHeader'
import { getUnionProjectPage } from '@/api/fams/statistics'
import DialogForm from './DialogForm'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
export default {
  components: { DialogForm, AdvanceSearch, IepStatisticsHeader },
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
        '业务指标总金额': this.statistics[0],
        '项目总金额': this.statistics[1],
        '合同总金额': this.statistics[2],
        '到账总金额': this.statistics[3],
        '待签总金额': this.statistics[4],
        '开票总金额': this.statistics[5],
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
    handleDetail (row) {
      this.$openPage(`/fams_spa/project/${row.orgId}`)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getUnionProjectPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
<style scoped>
</style>
