<template>
  <div id="visitNumber">
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('visitNumber'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
          axisTick: {
            length: 0,
          },
        },
        legend: {
          data: ['核心客户', '重要客户', '一般客户', '潜在客户', '其他客户'],
          bottom: 0,
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '10%',
          top: '2%',
          containLabel: true,
        },
        series: [
          {
            name: '核心客户',
            data: [5, 5, 5, 0, 0, 0, 0],
            type: 'line',
            itemStyle: {
              color: '#D56368',
            },
          },
          {
            name: '重要客户',
            data: [8, 8, 8, 9, 10, 15, 20],
            type: 'line',
            itemStyle: {
              color: '#F3F3BC',
            },
          },
          {
            name: '一般客户',
            data: [10, 10, 10, 10, 5, 4, 3],
            type: 'line',
            itemStyle: {
              color: '#A9CCF0',
            },
          },
          {
            name: '潜在客户',
            data: [20, 10, 2, 17, 30, 21, 12],
            type: 'line',
            itemStyle: {
              color: '#B7BFCF',
            },
          },
          {
            name: '其他客户',
            data: [15, 18, 20, 20, 20, 17, 15],
            type: 'line',
            itemStyle: {
              color: '#FFB880',
            },
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#visitNumber {
  width: auto;
  height: 280px;
}
</style>
