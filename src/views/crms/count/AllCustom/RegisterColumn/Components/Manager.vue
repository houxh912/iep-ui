<template>
  <div id="Manager">
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
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
      let myChart = echarts.init(document.getElementById('Manager'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['客户', '联系人'],
          bottom: 0,
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '10%',
          top: '2%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['张佩瑜', '中艺桥', '何依婷', '王俊辉', '毛莹莹'],
          axisTick: {
            length: 0,
          },
        },
        series: [
          {
            name: '客户',
            type: 'bar',
            data: [150, 58, 123, 78, 170],
            itemStyle: {
              color: '#D56368',
              barBorderRadius: 50,
            },
            barWidth: 10,
          },
          {
            name: '联系人',
            type: 'bar',
            data: [80, 23, 22, 120, 100],
            barWidth: 10,
            itemStyle: {
              color: '#DDDDDD',
              barBorderRadius: 50,
            },
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#Manager {
  width: "auto";
  height: 290px;
}
</style>
