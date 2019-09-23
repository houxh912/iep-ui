<template>
  <div>
    <basic-container>
      <iep-page-header title="投资核准"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="orgName"></operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column prop="company" label="组织名" width="300">
            <template slot-scope="scope">
              <iep-table-link-img-desc :img="scope.row.orgLogo" :name="scope.row.orgName" v-on:m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status===2" type="warning" @click="handleReview(scope.row)" plain>核准</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import { getInvestmentPage, ReviewInvestmentBatch } from '@/api/fams/investment'
import { columnsMap, dictsMap } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      status: '1',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '核准'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = ReviewInvestmentBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/management_detail/${row.id}`,
      })
    },
    handleChange () {
      this.loadPage()
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ status: 2, ...param }, getInvestmentPage)
    },
  },
}
</script>
