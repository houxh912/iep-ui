<template>
  <div class="pie-chart-wrapper">
    <h1>标签分布</h1>
    <no-data v-if="!realData.length" style="height: 300px;"></no-data>
    <ve-histogram v-else :data="chartData" height="300px" legend-position="bottom"></ve-histogram>
  </div>
</template>
<script>
import { getTagDistributed } from '@/api/tms/statistics'
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
        columns: ['item', 'count'],
        rows: this.realData,
      }
    },
  },
  created () {
    this.loadDistributed()
  },
  methods: {
    loadDistributed () {
      getTagDistributed().then(res => {
        this.realData = res.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.pie-chart-wrapper {
  h1 {
    font-size: 20px;
  }
}
</style>
