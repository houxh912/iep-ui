<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary>
  </iep-table>
</template>
       
<script>
import { getShareList } from '@/api/fams/investment'

export default {
  data () {
    const parseToPercent1 = (row) => {
      return this.$options.filters.parseToPercent(row.nonCirculatingRatio)
    }
    const parseToPercent2 = (row) => {
      return this.$options.filters.parseToPercent(row.circulationRatio)
    }
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
          label: '非流通股本比例',
          type: 'custom',
          customFunction: parseToPercent1,
        },
        {
          prop: 'circulationNumber',
          label: '流通股本',
        },
        {
          prop: 'circulationRatio',
          label: '流通股本比例',
          type: 'custom',
          customFunction: parseToPercent2,
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