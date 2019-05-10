<template>
  <div>
    <basic-container>
      <page-header title="发票" :replaceText="replaceText" :data="[10 ,5,10,25,15,31421.00,4733.00,355]"></page-header>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain v-if="scope.row.status==1 || scope.row.status==2" @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button type="warning" plain v-if="scope.row.status==0" @click="handleReview(scope.row)">审核</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <!-- <new-approval ref="NewApproval" @load-page="loadPage"></new-approval> -->
  </div>
</template>

<script>
import { getMyInvoicePage } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      classify: '',
      paramForm: initSearchForm(),
      replaceText: (data) => `（待审核：${data[0]}笔，已通过：${data[1]}笔，未通过：${data[2]}笔，废弃：${data[3]}笔，总计：${data[4]}，有效发票：￥${data[5]}元，已用发票：￥${data[6]}元，剩余发票：￥${data[7]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    // handleDetail () {
    //   this.$emit('onDetail', {
    //     formRequestFn: getFinancialManagementPage,
    //     methodName: '查看明细',
    //   })
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyInvoicePage)
    },
    // handleReview (row) {
    //   this.$refs['iepReviewForm'].title = '审核'
    //   this.$refs['iepReviewForm'].id = row.id
    //   this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
    //   this.$refs['iepReviewForm'].dialogShow = true
    // },
  },
}
</script>
<style scoped>
</style>
