<template>
  <div>
    <basic-container>
      <iep-page-header title="报销审核"></iep-page-header>
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
              <iep-button type="warning" plain v-if="scope.row.primaryAudit===0" @click.stop="handlePass(scope.row)">通过</iep-button>
              <iep-button v-if="scope.row.primaryAudit===0" @click.stop="handleReject(scope.row)">驳回</iep-button>
              <iep-button v-if="scope.row.primaryAudit===0" @click.stop="handleTrans(scope.row)">转交</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <invoice-pass-dialog-form ref="InvoicePassDialogForm" @load-page="loadPage"></invoice-pass-dialog-form>
    <invoice-reject-dialog-form ref="InvoiceRejectDialogForm" @load-page="loadPage"></invoice-reject-dialog-form>
    <invoice-trans-dialog-form ref="InvoiceTransDialogForm" @load-page="loadPage"></invoice-trans-dialog-form>
  </div>
</template>

<script>
import { getMyInvoiceApprovalPage } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options.js'
import InvoicePassDialogForm from '@/views/fams/Components/InvoicePassDialogForm.vue'
import InvoiceRejectDialogForm from '@/views/fams/Components/InvoiceRejectDialogForm.vue'
import InvoiceTransDialogForm from '@/views/fams/Components/InvoiceTransDialogForm'
export default {
  components: { InvoiceRejectDialogForm, InvoicePassDialogForm, InvoiceTransDialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleTrans (row) {
      this.$refs['InvoiceTransDialogForm'].id = row.id
      this.$refs['InvoiceTransDialogForm'].user = { id: '', name: '' }
      this.$refs['InvoiceTransDialogForm'].content = ''
      this.$refs['InvoiceTransDialogForm'].dialogShow = true
    },
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
        query: {
          isApproval: true,
        },
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyInvoiceApprovalPage)
    },
  },
}
</script>
<style scoped>
</style>
