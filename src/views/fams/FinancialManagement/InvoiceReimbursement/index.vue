<template>
  <div>
    <basic-container>
      <iep-page-header title="报销管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button v-if="qichuzhi_edit && scope.row.financialAudit===1&&scope.row.referType === 1" @click="handleEditProject(scope.row)" plain>修改</iep-button>
              <iep-button v-if="scope.row.financialAudit===0" @click="handlePass(scope.row)" plain>通过</iep-button>
              <iep-button v-if="scope.row.financialAudit===0" @click="handleReject(scope.row)">驳回</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <invoice-pass-dialog-form ref="InvoicePassDialogForm" is-financial @load-page="loadPage"></invoice-pass-dialog-form>
    <invoice-reject-dialog-form ref="InvoiceRejectDialogForm" is-financial @load-page="loadPage"></invoice-reject-dialog-form>
    <relation-dialog-form ref="RelationDialogForm" @load-page="loadPage"></relation-dialog-form>
  </div>
</template>

<script>
import { getInvoicePage } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import RelationDialogForm from './RelationDialogForm'
import InvoicePassDialogForm from '@/views/fams/Components/InvoicePassDialogForm.vue'
import InvoiceRejectDialogForm from '@/views/fams/Components/InvoiceRejectDialogForm.vue'
import { mapGetters } from 'vuex'
export default {
  components: { InvoicePassDialogForm, InvoiceRejectDialogForm, RelationDialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0, 0],
      replaceText: (data) => `（待核准：${data[0]}笔，总计：${data[1]}，已确认：${data[2]}笔，总计：${data[3]}）`,
      qichuzhi_edit: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.qichuzhi_edit = this.permissions['qichuzhi_edit']
    this.loadPage()
  },
  methods: {
    handleEditProject (row) {
      this.$refs['RelationDialogForm'].id = row.id
      this.$refs['RelationDialogForm'].loadPage()
      this.$refs['RelationDialogForm'].dialogShow = true
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
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getInvoicePage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>