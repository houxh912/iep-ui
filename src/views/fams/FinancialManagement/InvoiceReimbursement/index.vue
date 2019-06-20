<template>
  <div>
    <basic-container>
      <page-header title="报销管理" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
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
    <invoice-pass-dialog-form ref="InvoicePassDialogForm" is-financial @load-page="loadPage"></invoice-pass-dialog-form>
    <invoice-reject-dialog-form ref="InvoiceRejectDialogForm" is-financial @load-page="loadPage"></invoice-reject-dialog-form>
  </div>
</template>

<script>
import { getInvoicePage } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import InvoicePassDialogForm from '@/views/fams/Components/InvoicePassDialogForm.vue'
import InvoiceRejectDialogForm from '@/views/fams/Components/InvoiceRejectDialogForm.vue'
export default {
  components: { InvoicePassDialogForm, InvoiceRejectDialogForm },
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
    handlePass (row) {
      this.$refs['InvoicePassDialogForm'].id = row.id
      this.$refs['InvoicePassDialogForm'].content = ''
      this.$refs['InvoicePassDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['InvoiceRejectDialogForm'].id = row.id
      this.$refs['InvoiceRejectDialogForm'].content = ''
      this.$refs['InvoiceRejectDialogForm'].dialogShow = true
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
