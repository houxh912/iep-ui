<template>
  <div>
    <basic-container>
      <page-header title="报销管理" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{genStatus(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="部门审批人">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.auditorName"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="审核日期">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.auditingTime"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.financialAudit===0" @click.stop="handlePass(scope.row)">通过</iep-button>
              <iep-button v-if="scope.row.financialAudit===0" @click.stop="handleReject(scope.row)">驳回</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <pass-dialog-form ref="passDialogForm" @load-page="loadPage"></pass-dialog-form>
    <reject-dialog-form ref="rejectDialogForm" @load-page="loadPage"></reject-dialog-form>
  </div>
</template>

<script>
import { getInvoicePage } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { genStatus } from '@/const/invoiceConfig'
import { columnsMap, dictsMap } from './options'
import passDialogForm from './passDialogForm'
import rejectDialogForm from './rejectDialogForm'
export default {
  components: { rejectDialogForm, passDialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0, 0],
      replaceText: (data) => `（待审核：${data[0]}笔，总计：${data[1]}，已确认：${data[2]}笔，总计：${data[3]}）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    genStatus,
    handlePass (row) {
      this.$refs['passDialogForm'].id = row.id
      this.$refs['passDialogForm'].content = ''
      this.$refs['passDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['rejectDialogForm'].id = row.id
      this.$refs['rejectDialogForm'].content = ''
      this.$refs['rejectDialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/invoice_detail/${row.id}`,
      })
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getInvoicePage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
<style scoped>
</style>
