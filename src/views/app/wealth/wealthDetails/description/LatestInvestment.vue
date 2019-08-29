<template>
  <div>
    <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable">

    </iep-table>
  </div>
</template>
<script>

import { getInvestmentById } from '@/api/fams/investment'

const dictsMap = {
  status: {
    '1': '现金',
    '2': '国脉贝',
  },
}
const columnsMap = [
  {
    prop: 'id',
    label: '序号',
  },
  {
    prop: 'userName',
    label: '投资人',
  },
  {
    prop: 'totalAmount',
    label: '投资金额（元）',
  },
  {
    prop: 'status',
    label: '支付方式',
    type: 'dict',
  },
  {
    prop: 'updateTime',
    label: '投资时间',
  },
]
export default {
  data () {
    return {
      columnsMap,
      dictsMap,
      pagedTable: [],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.isLoadTable = true
    this.loadPage()
  },
  methods: {
    loadPage () {
      getInvestmentById(this.id).then(({ data }) => {
        this.pagedTable = data.data.record
        this.isLoadTable = false
        var recordLen = this.pagedTable.length
        for (var i = 0; i < recordLen; i++) {
          var surname = this.pagedTable[i].userName.substring(0, 1)
          this.pagedTable[i].userName = surname + '**'
        }
      })
    },
  },
}
</script>