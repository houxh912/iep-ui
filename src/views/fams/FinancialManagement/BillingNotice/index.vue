<template>
  <div>
    <basic-container>
      <iep-page-header title="开票核准"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button v-if="scope.row.status===1" @click="handlePass(scope.row)" plain>通过</iep-button>
              <iep-button v-if="scope.row.status===1" @click="handleReject(scope.row)">驳回</iep-button>
              <iep-button v-if="scope.row.status!==1" @click="handleDelete(scope.row)">废除</iep-button>
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
import { getBillingPage, deleteBillingById } from '@/api/fams/billing'
import mixins from '@/mixins/mixins'
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
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteBillingById)
    },
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
        path: `/fams_spa/billing_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBillingPage)
    },
  },
}
</script>
<style scoped>
</style>
