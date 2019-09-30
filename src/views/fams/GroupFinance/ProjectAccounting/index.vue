<template>
  <div>
    <basic-container>
      <iep-statistics-header title="项目核算-集团" :dataMap="financialData">
        <template slot="left">
          <iep-tip icon="el-icon-question" content="项目金额=合同金额+待签金额<br/>
                            合同金额：已经签订合同的项目金额<br/>
                            待签金额：未签订合同的项目金额<br/>
                            开票金额：已经开发票的项目金额<br/>
                            应收账款金额：已经开发票的未到账的项目金额<br/>
                            业务指标完成率：合同金额/业务指标"></iep-tip>
        </template>
        <template slot="right">
          <iep-button type="primary" @click="$openPage(`/fams_spa/union_payment_plan`)">查看回款计划</iep-button>
        </template>
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
          <el-table-column label="时间" width="70px">
            <template slot-scope="scope">
              {{scope.row.businessYear + '年'}}
            </template>
          </el-table-column>
        </template>
        <!-- <el-table-column label="合同金额">
          <template slot-scope="scope">
            {{ ((scope.row.contractAmount||0) + (scope.row.projectAmount||0)) }}
          </template>
        </el-table-column> -->
        <el-table-column label="开票应收账款金额">
          <template slot-scope="scope">
            {{!scope.row.invoicingAmount ? '暂无' : ((scope.row.invoicingAmount||0) - (scope.row.projectIncome||0)) }}
          </template>
        </el-table-column>
        <el-table-column label="业务指标完成率(%)">
          <template slot-scope="scope">
            {{!scope.row.amount ? '暂无' : (((scope.row.contractAmount||0) / (scope.row.amount))*100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <iep-button @click.stop="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <create-dialog ref="CreateDialog" @load-page="loadPage"></create-dialog>
  </div>
</template>

<script>
import { getUnionProjectPage } from '@/api/fams/statistics'
import DialogForm from './DialogForm'
import CreateDialog from './CreateDialog'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm } from './options'
export default {
  components: {
    DialogForm,
    CreateDialog,
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0, 0],
    }
  },
  computed: {
    financialData () {
      return {
        '业务指标总金额': this.statistics[0],
        '待签项目总金额': this.statistics[1],
        '合同总金额': this.statistics[2],
        '到账总金额': this.statistics[3],
        '未到账总金额': this.statistics[4],
        '开票总金额': this.statistics[5],
        '开票应收账款': this.statistics[6],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['CreateDialog'].form = initForm()
      this.$refs['CreateDialog'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = { ...row }
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$openPage(`/fams_spa/project/${row.orgId}?name=${row.orgName}`)
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
