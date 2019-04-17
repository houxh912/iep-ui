<template>
  <div id="areaType">
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
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
      let myChart = echarts.init(document.getElementById('areaType'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],
            label: {
              normal: {
                position: 'inner',
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: 879, name: '一季度', itemStyle: { color: '#F9D5B7' } },
              { value: 494, name: '二季度', itemStyle: { color: '#D7EBFC' } },
              { value: 351, name: '三季度', itemStyle: { color: '#F2B9BC' } },
              { value: 306, name: '四季度', itemStyle: { color: '#FFEBB0' } },
            ],
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            label: {
              normal: {
                formatter: '{b|{b}：}{c}  {per|{d}%} ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                color: '#000',
                rich: {
                  a: {
                    color: '#000',
                    lineHeight: 22,
                    align: 'center',
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 22,
                    color: '#000',
                  },
                  per: {
                    color: '#000',
                    padding: [2, 4],
                    borderRadius: 2,
                  },
                },
              },
            },
            data: [
              { value: 335, name: '1月', itemStyle: { color: '#F9D5B7' } },
              { value: 310, name: '2月', itemStyle: { color: '#F9D5B7' } },
              { value: 234, name: '3月', itemStyle: { color: '#F9D5B7' } },
              { value: 135, name: '4月', itemStyle: { color: '#D7EBFC' } },
              { value: 108, name: '5月', itemStyle: { color: '#D7EBFC' } },
              { value: 251, name: '6月', itemStyle: { color: '#D7EBFC' } },
              { value: 147, name: '7月', itemStyle: { color: '#F2B9BC' } },
              { value: 102, name: '8月', itemStyle: { color: '#F2B9BC' } },
              { value: 102, name: '9月', itemStyle: { color: '#F2B9BC' } },
              { value: 102, name: '10月', itemStyle: { color: '#FFEBB0' } },
              { value: 102, name: '11月', itemStyle: { color: '#FFEBB0' } },
              { value: 102, name: '12月', itemStyle: { color: '#FFEBB0' } },
            ],
          },
        ],
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#areaType {
  width: "auto";
  height: 290px;
}
</style>

