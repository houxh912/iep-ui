<template>
  <ve-line :data="chartData" :extend="chartExtend" :colors="colors" :toolbox="toolbox" height="307px">
  </ve-line>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#f58f44']
    this.chartSettings = {
      metrics: ['计划收款', '实际收款'],
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
        columns: ['dept', '计划收款', '实际收款'],
        rows: [
          { 'dept': '1月', '计划收款': 100, '实际收款': 90 },
          { 'dept': '2月', '计划收款': 80, '实际收款': 90 },
          { 'dept': '3月', '计划收款': 140, '实际收款': 130 },
          { 'dept': '4月', '计划收款': 150, '实际收款': 130 },
          { 'dept': '5月', '计划收款': 185, '实际收款': 205 },
          { 'dept': '6月', '计划收款': 185, '实际收款': 195 },
          { 'dept': '7月', '计划收款': 195, '实际收款': 205 },
          { 'dept': '8月', '计划收款': 185, '实际收款': 225 },
          { 'dept': '9月', '计划收款': 250, '实际收款': 240 },
          { 'dept': '10月', '计划收款': 300, '实际收款': 270 },
          { 'dept': '11月', '计划收款': 349, '实际收款': 385 },
          { 'dept': '12月', '计划收款': 445, '实际收款': 445 },
        ],
      },
    }
  },
}
</script>