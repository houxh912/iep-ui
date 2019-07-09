<template>
  <ve-line :data="chartData" :extend="chartExtend" :colors="colors" :toolbox="toolbox" height="280px">
  </ve-line>
</template>

<script>
import { getAchievement } from '@/api/app/mlms/'
export default {
  props: {
    orgId: {
      default: 0,
    },
  },
  data () {
    this.colors = ['#d66368', '#f58f44', '#65dbe8', '#631cac']
    this.chartSettings = {
      metrics: ['业绩趋势'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },
    }
    this.toolbox = {
      feature: {
        magicType: { type: ['line', 'bar'] },
        saveAsImage: {},
      },
    }
    this.chartExtend = {
      barWidth: '10',
      itemStyle: {
        barBorderRadius: 10,
      },
    }
    return {
      replaceText: (data) => `（计划收款共计${data[0]}笔，共计${data[0]}贝）`,
      value6: '',
      chartData: {
        columns: ['dept', '业绩趋势'],
        rows: [
          { 'dept': '1月', '业绩趋势': 0 },
          { 'dept': '2月', '业绩趋势': 0 },
          { 'dept': '3月', '业绩趋势': 0 },
          { 'dept': '4月', '业绩趋势': 0 },
          { 'dept': '5月', '业绩趋势': 0 },
          { 'dept': '6月', '业绩趋势': 0 },
          { 'dept': '7月', '业绩趋势': 0 },
          { 'dept': '8月', '业绩趋势': 0 },
          { 'dept': '9月', '业绩趋势': 0 },
          { 'dept': '10月', '业绩趋势': 0 },
          { 'dept': '11月', '业绩趋势': 0 },
          { 'dept': '12月', '业绩趋势': 0 }],
      },
    }
  },
  watch: {
    orgId (val) {
      getAchievement(val).then(({data}) => {
        let list = data.data.map( m => { return { dept: m.month, '业绩趋势': m.value }})
        this.$set(this.chartData, 'rows', list )
      })
    },
  },
}
</script>