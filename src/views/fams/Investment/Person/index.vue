<template>
  <div>
    <basic-container>
      <page-header title="投资人核准"></page-header>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection is-tree>
        <template slot="before-columns">
          <el-table-column label="投资人">
            <template slot-scope="scope">
              {{scope.row.userName}}
            </template>
          </el-table-column>
          <el-table-column label="投资组织">
            <template slot-scope="scope">
              {{scope.row.orgName}}
            </template>
          </el-table-column>
          <el-table-column label="支付方式">
            <template>
              国脉贝
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleReview(scope.row)" v-if="scope.row.status==1">核准</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import { getInvestmentPersonPage, PersonInvestmentBatch } from '@/api/fams/investment'
import { columnsMap, dictsMap } from './options'
import mixins from '@/mixins/mixins'
export default {
  data () {
    return {
      columnsMap,
      dictsMap,
      pagination:{},
      pagedTable: [],
    }
  },
  mixins:[mixins],
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '核准'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = PersonInvestmentBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ status: this.status, ...param }, getInvestmentPersonPage)
    },
  },
}
</script>
