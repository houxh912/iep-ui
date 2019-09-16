<template>
  <div>
    <div class="containers">
      <div id='myChartOne'></div>
    </div>
  </div>

</template>
<script>
import Vue from 'vue'
import Echarts from 'echarts'
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
export default {
  props: ['recordData'],
  data () {
    return {

    }
  },
  created () {
    this.load()
  },
  mounted () {
    this.charts()
  },
  methods: {
    /**
    * 获取echarts数据
    */
    load () {
      console.log('recordData22', this.recordData)
      // this.charts()
    },

    /**
    * 绘制echarts图的方法
    */
    charts () {
      const oneChart = this.echarts.init(document.getElementById('myChartOne'))
      oneChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '0%',
          right: '2%',
          top: '12%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, //x轴不从零开始
          axisLine: {        //x轴线设置
            lineStyle: {
              color: '#ccc',
              width: 1,
              type: 'solid',
            },
          },
          axisLabel: {       //x轴坐标设置
            show: true,
            textStyle: {
              color: '#666',
            },
          },
          data: ['0-60分', '60-70分', '71-80分', '81-89分', '90-100分'],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 1,
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666',
            },
          },
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#C1232B', '#E87C25', '#FCCE10', '#B5C334', '#27727B']
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}个',
                },
              },
            },
            data: [10, 42, 36, 30, 10, 7, 5],
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.containers {
  width: 75%;
  height: 350px;
  margin: auto auto;
  #myChartOne {
    width: 100%;
    height: 100%;
  }
}
</style>