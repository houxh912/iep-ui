<template>
  <div>
    <basic-container>
      <page-header title="费用核准"></page-header>
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
              <iep-button @click.stop="handlePass(scope.row)">通过</iep-button>
              <iep-button @click.stop="handleReject(scope.row)">驳回</iep-button>
              <iep-button @click.stop="handleTrans(scope.row)">转交</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <fee-pass-dialog-form ref="FeePassDialogForm" @load-page="loadPage"></fee-pass-dialog-form>
    <fee-reject-dialog-form ref="FeeRejectDialogForm" @load-page="loadPage"></fee-reject-dialog-form>
    <fee-trans-dialog-form ref="FeeTransDialogForm" @load-page="loadPage"></fee-trans-dialog-form>
  </div>
</template>

<script>
import { getMyFeeApprovalPage } from '@/api/fams/fee'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options.js'
import FeePassDialogForm from '@/views/fams/Components/FeePassDialogForm.vue'
import FeeRejectDialogForm from '@/views/fams/Components/FeeRejectDialogForm.vue'
import FeeTransDialogForm from '@/views/fams/Components/FeeTransDialogForm'
export default {
  components: { FeeRejectDialogForm, FeePassDialogForm, FeeTransDialogForm },
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
      this.$refs['FeeTransDialogForm'].id = row.costId
      this.$refs['FeeTransDialogForm'].user = { id: '', name: '' }
      this.$refs['FeeTransDialogForm'].content = ''
      this.$refs['FeeTransDialogForm'].dialogShow = true
    },
    handlePass (row) {
      this.$refs['FeePassDialogForm'].id = row.costId
      this.$refs['FeePassDialogForm'].content = ''
      this.$refs['FeePassDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['FeeRejectDialogForm'].id = row.costId
      this.$refs['FeeRejectDialogForm'].content = ''
      this.$refs['FeeRejectDialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/fee_detail/${row.costId}`,
        query: {
          approval: 'true',
        },
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyFeeApprovalPage)
    },
  },
}
</script>