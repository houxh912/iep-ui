<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="申请人" width="120px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button size="small" type="warning" @click="handleReview(scope.row)" plain>审核</el-button>
          <el-button size="small" @click="handleDeliver(scope.row)">转交</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <new-approval ref="NewApproval" @load-page="loadPage"></new-approval>
  </div>
</template>
<script>
import { getExaminApprovalPage, postApproval, reviewApprovaBatch } from '@/api/wel/administrative_approval'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import IepReviewConfirm from '@/components/IepCommon/ReviewConfirm'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  mixins: [mixins],
  components: { NewApproval, IepReviewConfirm },
  data () {
    return {
      columnsMap,
      dictsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
      this.$refs['NewApproval'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: '/hrms_spa/approval_detail',
        query: {
          id: row.id,
          redirect: this.$route.fullPath,
        },
      })
    },
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleDeliver (row) {
      this._handleComfirm(row.id, postApproval, 'tsyi')
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExaminApprovalPage)
    },
  },
}
</script>
