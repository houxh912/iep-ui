<template>
  <div class="warp">
    <div id="Manager" :style="{width:'100%',height:height}">
    </div>
  </div>

</template>

<script>
import { getAllManager } from '@/api/crms/count'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      marketManager: [],//市场经理
      clientQuantity: [],//客户
      contactQuantity: [],//联系人
      height: '560px',
    }
  },
  created () {
    this.load()
  },
  mounted () {
    this.draw()
  },
  methods: {
    load () {
      getAllManager().then((res) => {
        let arr = res.data.data
        this.height = 280 * Math.ceil(arr.length / 5) + 'px'
        console.log(this.height)
        console.log(typeof this.height)
        for (var index in arr) {
          if (!arr[index].hasOwnProperty('contactQuantity')) {
            arr[index].contactQuantity = 0
          }
        }
        this.marketManager = arr.map(m => m.marketManager)
        this.clientQuantity = arr.map(m => m.clientQuantity)
        this.contactQuantity = arr.map(m => m.contactQuantity)
        this.draw()
      })
    },
    draw () {
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
          left: '20px',
          right: '40px',
          bottom: '20px',
          top: '20px',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          // data: ['张佩瑜', '中艺桥', '何依婷', '王俊辉', '毛莹莹'],
          data: this.marketManager,
          axisTick: {
            length: 0,
          },
        },
        series: [
          {
            name: '客户',
            type: 'bar',
            // data: [150, 58, 123, 78, 170],
            data: this.clientQuantity,
            itemStyle: {
              color: '#D56368',
              barBorderRadius: 50,
            },
            barWidth: 10,
          },
          {
            name: '联系人',
            type: 'bar',
            // data: [80, 23, 22, 120, 100],
            data: this.contactQuantity,
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
.warp {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.warp::-webkit-scrollbar {
  height: 6px;
}
.warp::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.warp::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: transparent;
}
</style>
