<template>
  <ve-line :data="chartData" :extend="chartExtend" :colors="colors" :toolbox="toolbox" height="280px">
  </ve-line>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#f58f44', '#65dbe8', '#631cac']
    this.chartSettings = {
      metrics: ['计划收款', '实际收款', '销售额', '合同数'],
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
        columns: ['dept', '计划收款', '实际收款', '销售额', '合同数'],
        rows: [
          { 'dept': '1月', '计划收款': 100, '实际收款': 90, '销售额': 150, '合同数': 10 },
          { 'dept': '2月', '计划收款': 80, '实际收款': 90, '销售额': 160, '合同数': 12 },
          { 'dept': '3月', '计划收款': 140, '实际收款': 130, '销售额': 180, '合同数': 15 },
          { 'dept': '4月', '计划收款': 150, '实际收款': 130, '销售额': 280, '合同数': 24 },
          { 'dept': '5月', '计划收款': 185, '实际收款': 205, '销售额': 160, '合同数': 15 },
          { 'dept': '6月', '计划收款': 185, '实际收款': 195, '销售额': 200, '合同数': 20 },
          { 'dept': '7月', '计划收款': 195, '实际收款': 205, '销售额': 240, '合同数': 30 },
          { 'dept': '8月', '计划收款': 185, '实际收款': 225, '销售额': 240, '合同数': 40 },
          { 'dept': '9月', '计划收款': 250, '实际收款': 240, '销售额': 280, '合同数': 35 },
          { 'dept': '10月', '计划收款': 300, '实际收款': 270, '销售额': 315, '合同数': 45 },
          { 'dept': '11月', '计划收款': 349, '实际收款': 385, '销售额': 355, '合同数': 50 },
          { 'dept': '12月', '计划收款': 445, '实际收款': 445, '销售额': 375, '合同数': 80 },
        ],
      },
    }
  },
}
</script>