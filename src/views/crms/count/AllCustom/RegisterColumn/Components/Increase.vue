<template>
  <div id="increase">
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
      let myChart = echarts.init(document.getElementById('increase'))
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
        series: [
          {
            name: '客户',
            data: [4, 6, 4, 7, 2, 4, 5],
            type: 'line',
            itemStyle: {
              color: '#D56368',
            },
          }, {
            name: '联系人',
            data: [2, 3, 1, 4, 8, 9, 10],
            type: 'line',
            itemStyle: {
              color: '#DDDDDD',
            },
          },
        ],
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#increase {
  width: "auto";
  height: 290px;
}
</style>
