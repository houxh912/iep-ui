
<template>
  <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getRelationPage } from '@/api/fams/investment'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'userName',
          label: '交易人',
        },
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
          prop: 'holdNumber',
          label: '交易后持有流通股份数量',
        },
        {
          prop: 'createTime',
          label: '买入时间',
        },
      ],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, investmentId: this.id }, getRelationPage)
    },
  },
}
</script>