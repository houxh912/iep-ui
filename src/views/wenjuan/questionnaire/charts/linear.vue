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
      let keyData = []
      let series = []
      if(this.data.type != '8'){
        let valueData = []
        for(let item of this.data.data){
          keyData.push(item.name)
          valueData.push(item.value)
        }
        series = [{
          name: '选择',
          type: 'bar',
          // barWidth: '60%',
          data: valueData,
        }]
      }else{
        keyData=['1分','2分','3分','4分','5分']
        for(let item of this.data.data){
          let sData = []
          // keyData.push(item.name)
          for(let key in item.value){
            sData.push(item.value[key])
          }
          series.push({
            name: item.name,
            type: 'bar',
            // barWidth: '60%',
            data: sData,
          })
        }
      }
      if (bar_dv) {
        let option = {
          title: {
            text: this.data.title,
            subtext: '参与人数' + this.data.total + '人',
            x: 'center',
          },
          color: ['#3398DB', '#006699', '#4cabce', '#e5323e'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [{
            type: 'value',
          }],
          yAxis:[{
            type: 'category',
            data: keyData,
            axisTick: {
              alignWithLabel: true,
            },
          }],
          series: series,
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
      $a.setAttribute('download', this.data.title+'-线性图')
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
