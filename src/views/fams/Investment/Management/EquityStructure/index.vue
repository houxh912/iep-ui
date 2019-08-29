<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary>
  </iep-table>
</template>
       
<script>
import { getShareList } from '@/api/fams/investment'
export default {
  data () {
    return {
      columnsMap: [
        {
          prop: 'holdType',
          label: '持股类型',
          type: 'dictGroup',
          dictName: 'FAMS_HOLD_TYPE',
        },
        {
          prop: 'nonCirculationNumber',
          label: '非流通股本',
        },
        {
          prop: 'nonCirculatingRatio',
          label: '比例',
        },
        {
          prop: 'circulationNumber',
          label: '流通股本',
        },
        {
          prop: 'totalRatio',
          label: '累计',
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
      getShareList(this.id).then(({ data }) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
  },
}
</script>