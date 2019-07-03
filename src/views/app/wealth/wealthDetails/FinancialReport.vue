<template>
    <IepAppTabCard title="投资记录">
        <iep-table :isLoadTable="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" :isPagination="false">
          
        </iep-table>
    </IepAppTabCard>
</template>
<script>

// import { getInvestmentById } from '@/api/fams/investment'

const dictsMap = {
    status: {
        '1': '现金',
        '2': '国脉贝',
    },
}
const columnsMap = [
  {
    prop: 'id',
    label: '资产类型',
  },
  {
    prop: 'userName',
    label: '金额',
  },
  {
    prop: 'totalAmount',
    label: '升降（同期）',
  },
  {
    prop: 'updateTime',
    label: '更新时间',
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
    },
  },
}
</script>