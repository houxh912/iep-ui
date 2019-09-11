<template>
  <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" :summary-method="getSummaries" show-summary>
  </iep-table>
</template>
       
<script>
import { getShareList } from '@/api/fams/investment'

export default {
  data () {
    const parsePercent = (prop) => {
      return (row) => {
        return this.$options.filters.parseToPercent(row[prop])
      }
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
          customFunction: parsePercent('nonCirculatingRatio'),
        },
        {
          prop: 'circulationNumber',
          label: '流通股本',
        },
        {
          prop: 'circulationRatio',
          label: '流通股本比例',
          type: 'custom',
          customFunction: parsePercent('circulationRatio'),
        },
        {
          prop: 'totalRatio',
          label: '累计',
          type: 'custom',
          customFunction: parsePercent('totalRatio'),
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
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getShareList(this.id)
      this.isLoadTable = false
      this.pagedTable = data.data
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
          if ([2, 4, 5].includes(index)) {
            sums[index] = this.$options.filters.parseToPercent(sums[index])
          }
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
  },
}
</script>