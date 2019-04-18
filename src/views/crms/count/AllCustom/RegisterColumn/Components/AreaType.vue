<template>
  <!-- <div id="areaType">
  </div> -->
  <ve-pie :data="chartData" :settings="chartSettings" height="280px" :extend="chartExtend"></ve-pie>
</template>

<script>
// let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/pie')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
import Vue from 'vue'
import VePie from 'v-charts/lib/pie.common'
Vue.component(VePie.name, VePie)
export default {
  data () {
    this.chartSettings = {
      level: [
        ['第一季度', '第二季度', '第三季度', '第四季度'],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ],
      legendLimit: 0,
    },
      this.chartExtend = {
        series: [{
          center: ['50%', '50%'],
        }],
      }
    return {
      chartData: {
        columns: ['time', 'value'],
        rows: [
          { 'time': '第一季度', 'value': 1393 },
          { 'time': '第二季度', 'value': 3530 },
          { 'time': '第三季度', 'value': 2923 },
          { 'time': '第四季度', 'value': 1723 },
          { 'time': '1月', 'value': 3792 },
          { 'time': '2月', 'value': 4593 },
          { 'time': '3月', 'value': 4593 },
          { 'time': '4月', 'value': 4593 },
          { 'time': '5月', 'value': 4593 },
          { 'time': '6月', 'value': 4593 },
          { 'time': '7月', 'value': 4593 },
          { 'time': '8月', 'value': 4593 },
          { 'time': '9月', 'value': 4593 },
          { 'time': '10月', 'value': 4593 },
          { 'time': '11月', 'value': 4593 },
          { 'time': '12月', 'value': 4593 },
        ],
      },
    }
  },
  mounted () {
    // this.drawLine()
  },
  methods: {
    // drawLine () {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = echarts.init(document.getElementById('areaType'))
    //   // 绘制图表
    //   myChart.setOption({
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b}: {c} ({d}%)',
    //     },
    //     series: [
    //       {
    //         name: '访问来源',
    //         type: 'pie',
    //         selectedMode: 'single',
    //         radius: [0, '40%'],
    //         label: {
    //           normal: {
    //             position: 'inner',
    //           },
    //         },
    //         labelLine: {
    //           normal: {
    //             show: false,
    //           },
    //         },
    //         data: [
    //           { value: 879, name: '一季度', itemStyle: { color: '#F9D5B7' } },
    //           { value: 494, name: '二季度', itemStyle: { color: '#D7EBFC' } },
    //           { value: 351, name: '三季度', itemStyle: { color: '#F2B9BC' } },
    //           { value: 306, name: '四季度', itemStyle: { color: '#FFEBB0' } },
    //         ],
    //       },
    //       {
    //         name: '访问来源',
    //         type: 'pie',
    //         radius: ['50%', '80%'],
    //         label: {
    //           normal: {
    //             formatter: '{b|{b}：}{c}  {per|{d}%} ',
    //             backgroundColor: '#eee',
    //             borderColor: '#aaa',
    //             borderWidth: 1,
    //             borderRadius: 4,
    //             color: '#000',
    //             rich: {
    //               a: {
    //                 color: '#000',
    //                 lineHeight: 22,
    //                 align: 'center',
    //               },
    //               b: {
    //                 fontSize: 12,
    //                 lineHeight: 22,
    //                 color: '#000',
    //               },
    //               per: {
    //                 color: '#000',
    //                 padding: [2, 4],
    //                 borderRadius: 2,
    //               },
    //             },
    //           },
    //         },
    //         data: [
    //           { value: 335, name: '1月', itemStyle: { color: '#F9D5B7' } },
    //           { value: 310, name: '2月', itemStyle: { color: '#F9D5B7' } },
    //           { value: 234, name: '3月', itemStyle: { color: '#F9D5B7' } },
    //           { value: 135, name: '4月', itemStyle: { color: '#D7EBFC' } },
    //           { value: 108, name: '5月', itemStyle: { color: '#D7EBFC' } },
    //           { value: 251, name: '6月', itemStyle: { color: '#D7EBFC' } },
    //           { value: 147, name: '7月', itemStyle: { color: '#F2B9BC' } },
    //           { value: 102, name: '8月', itemStyle: { color: '#F2B9BC' } },
    //           { value: 102, name: '9月', itemStyle: { color: '#F2B9BC' } },
    //           { value: 102, name: '10月', itemStyle: { color: '#FFEBB0' } },
    //           { value: 102, name: '11月', itemStyle: { color: '#FFEBB0' } },
    //           { value: 102, name: '12月', itemStyle: { color: '#FFEBB0' } },
    //         ],
    //       },
    //     ],
    //   })
    // },
  },
}
</script>
<style lang="scss" scoped>
#areaType {
  width: "auto";
  height: 290px;
}
</style>

