
<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable">
    <template slot="before-columns">
      <el-table-column label="组织名称" width="250">
        <template slot-scope="scope">
          <iep-table-link-img-desc :img="scope.row.orgLogo" :name="scope.row.orgName" v-on:m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
        </template>
      </el-table-column>
    </template>
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getMyTransactionPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap: {
        transactionType: {
          1: '买入',
          2: '卖出',
        },
      },
      columnsMap: [
        {
          prop: 'totalAmount',
          label: '交易总值',
        },
        {
          prop: 'tradingPrice',
          label: '交易单价',
        },
        {
          prop: 'investmentNumber',
          label: '交易股数',
        },
        {
          prop: 'transactionType',
          label: '交易类型',
          type: 'dict',
        },
        {
          prop: 'createTime',
          label: '买入时间',
        },
      ],
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getMyTransactionPage)
    },
  },
}
</script>