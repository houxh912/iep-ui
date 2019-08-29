<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable">
  </iep-table>
</template>
       
<script>
import { getProjectPaymentPlanList } from '@/api/gpms/fas'
export default {
  data () {
    return {
      dictsMap: {
        paymentStatus: {
          0: '未到',
          1: '已到',
          2: '逾期',
          3: '逾期已到',
        },
      },
      columnsMap: [
        {
          prop: 'paymentAmount',
          label: '预计项目回款金额',
        },
        {
          prop: 'projectPaymentTime',
          label: '预计项目回款时间',
          type: 'date',
          formatString: 'YYYY-MM-DD',
        },
        {
          prop: 'actualRepayment',
          label: '实际项目回款金额',
        },
        {
          prop: 'dateCash',
          label: '实际回款日期',
        },
        {
          prop: 'paymentStatus',
          label: '回款状态',
          type: 'dict',
        },
      ],
      isLoadTable: true,
      pagedTable: [],
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
    loadPage () {
      this.isLoadTable = true
      getProjectPaymentPlanList(this.id).then(({ data }) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
  },
}
</script>