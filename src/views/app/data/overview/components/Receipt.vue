<template>
  <div class="receipt">
    <div class="title">{{title}}</div>
    <ve-histogram height="330px" :data="chartData" :extend="chartExtend" :settings="chartSettings" :colors="colors" :mark-point="markPoint"></ve-histogram>
  </div>
</template>

<script>
import { getPerformanceChanges } from '@/api/app/prms/'
// import { dateFormat } from '@/util/date'
export default {
  data () {
    this.colors = ['#d66368', '#eebc7d']
    this.chartSettings = {
      metrics: ['业绩发展'],
      dimension: ['name'],
    }
    this.chartExtend = {
      barWidth: '10',
    }
    this.markPoint = {
      data: [
        {
          name: '最大值',
          type: 'max',
        },
        {
          name: '最小值',
          type: 'min',
        },
      ],
    }
    return {
      title: '业绩变化',
      chartData: {
        columns: ['name', 'amount'],
        rows: [],
      },
    }
  },
  created () {
    getPerformanceChanges().then(({data}) => {
      this.$set(this.chartData, 'rows', data.data.map( m => { return { name: `${new Date(m.name).getMonth()}月`, amount: m.amount } } ))
    })
  },
}
</script>
<style lang="scss" scoped>
.receipt {
  position: relative;
  padding: 20px 0 0;
  .title {
    position: absolute;
    left: 0;
    top: 18px;
    font-size: 18px;
    color: #333;
  }
}
</style>