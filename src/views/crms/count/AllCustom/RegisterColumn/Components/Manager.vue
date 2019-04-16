<template>
  <div id="myChart" :style="{width: 'auto', height: '300px'}">
    <!-- <v-chart :forceFit="true" :height="height" :data="data">
      <v-coord type="rect" direction="LT" />
      <v-tooltip />
      <v-legend />
      <v-axis dataKey="value" position="right" />
      <v-axis dataKey="label" :label="label" />
      <v-bar position="label*value" color="type" :adjust="adjust" />
    </v-chart> -->
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
// const DataSet = require('@antv/data-set')

// const sourceData = [
//   { label: '张佩瑜', 客户: 150, 联系人: 80 },
//   { label: '中艺桥.', 客户: 58, 联系人: 23 },
//   { label: '何依婷.', 客户: 123, 联系人: 22 },
//   { label: '王俊辉.', 客户: 78, 联系人: 120 },
//   { label: '毛莹莹', 客户: 170, 联系人: 100 },
// ]

// const dv = new DataSet.View().source(sourceData)
// dv.transform({
//   type: 'fold',
//   fields: ['客户', '联系人'],
//   color: 'red',
//   key: 'type',
//   value: 'value',
// })
// const data = dv.rows

// const label = { offset: 12 }
// const adjust = [{ type: 'dodge', marginRatio: 1 / 32 }]
export default {
  data () {
    return {
      // data,
      // height: 300,
      // label: label,
      // adjust: adjust,
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['2011年', '2012年'],
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '0',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['张佩瑜', '中艺桥', '何依婷', '王俊辉', '毛莹莹'],
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [150, 58, 123, 78, 170],
            itemStyle: {
              color: '#D56368',
              barBorderRadius: 50,
            },
            barWidth: 15,
          },
          {
            name: '2012年',
            type: 'bar',
            data: [80, 23, 22, 120, 100],
            barWidth: 15,
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

<style>
</style>
