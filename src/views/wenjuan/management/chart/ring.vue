<template>
<div @downLoad="downLoad" :class='className' ref='chart' />
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Index',
  data () {
    return {
      chart: null,
    }
  },
  props: {
    className: {
      type: String,
      default: 'charts',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.init()
      },
    },
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs['chart'])
      this.loadMap()
    },
    loadMap () {
      var bar_dv = this.$refs.chart
      let myChart = echarts.init(bar_dv)
      if (bar_dv) {
        let option = {
          title: {
            text: this.data.title,
            subtext: '参与人数' + this.data.total + '人',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          // legend: {
          //   orient: 'vertical',
          //   x: 'left',
          //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          // },
          series: [{
            name: '选择',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label:{
              formatter: '{b}:{d}%',
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.data.data,
          }],
        }
        myChart.setOption(option)
      } else {
        console.log('error')
      }
    },
    downLoad () {
      var image = this.chart.getConnectedDataURL()
      var $a = document.createElement('a')
      $a.setAttribute('href', image)
      $a.setAttribute('download', this.data.title+'-圆形图')
      $a.click()
    },
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.init()
    })

  },
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
