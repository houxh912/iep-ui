<template>
  <div class="line-chart-wrapper">
    <h1>每日新增</h1>
    <no-data v-if="!realData.length" style="height: 300px;"></no-data>
    <ve-line v-else :data="chartData" height="300px" legend-position="bottom"></ve-line>
  </div>
</template>
<script>
import { getTagDayNew } from '@/api/tms/statistics'
import noData from './no-data'
export default {
  components: { noData },
  data () {
    return {
      realData: [],
    }
  },
  computed: {
    chartData () {
      return {
        columns: ['date', 'value'],
        rows: this.realData,
      }
    },
  },
  created () {
    this.loadLineChartData()
  },
  methods: {
    loadLineChartData () {
      getTagDayNew().then(res => {
        this.realData = res.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.line-chart-wrapper {
  h1 {
    font-size: 18px;
  }
}
</style>
