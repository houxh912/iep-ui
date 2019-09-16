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
  data () {
    return {

    }
  },
  created () {
    // this.load()
  },
  mounted () {
    this.charts()
  },
  methods: {
    /**
    * 获取echarts数据
    */
    load () {
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
        },
        legend: {
          x: 'center',
          y: 'bottom',
          icon: 'circle',
          itemWidth: 8,  // 设置图标宽度
          itemHeight: 8, // 设置图标高度
          itemGap: 30,
          textStyle: {
            fontSize: 12,
            color: '#666',
          },
          data: ['考试次数', '参加人数', '人均考试次数'],
        },
        grid: {
          left: '0%',
          right: '2%',
          top: '3%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, //x轴不从零开始
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
          axisTick: {
            show: false,
          },
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666',
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '考试次数',
            type: 'line',
            smooth: true,
            data: [2000, 1200, 2552, 620, 1200, 500, 1500, 856, 952, 1095, 2898, 4568],
          },
          {
            name: '参加人数',
            type: 'line',
            smooth: true,
            data: [456, 260, 656, 111, 655, 280, 444, 565, 565, 652, 500, 650],
          },
          {
            name: '人均考试次数',
            type: 'line',
            smooth: true,
            data: [5, 6, 6, 12, 50, 8, 6, 10, 12, 6, 8, 30],
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.containers {
  width: 90%;
  height: 400px;
  margin: auto auto;
  #myChartOne {
    width: 100%;
    height: 100%;
  }
}
</style>