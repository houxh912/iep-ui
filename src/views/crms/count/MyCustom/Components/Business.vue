<template>
  <div>
    <div id="business" :style="{width: '450px', height: '300px'}"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getMyBusiness } from '@/api/crms/count'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      data: [
        { value: '0', name: '咨询', label: 'consulting' },
        { value: '0', name: '数据', label: 'information' },
        { value: '0', name: '软件', label: 'softwareNumber' },
        { value: '0', name: '平台', label: 'platform' },
        { value: '0', name: '事项', label: 'matters' },
      ],
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
      getMyBusiness().then((res) => {
        var that = this
        Object.keys(res.data.data).forEach((item) => {
          var index = _.findIndex(that.data, function (o) { return o.label == item })
          that.data[index].value = res.data.data[item]
        })
        this.draw()
      })
    },
    draw () {
      let myChart = echarts.init(document.getElementById('business'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}：{c}%',
        },
        color: ['#A9CCF0', '#8D99B3', '#F0F0A9', '#FFD9BC', '#F1C8C8'],
        series: [
          {
            type: 'pie',
            label: {
              color: '#000',
              formatter: '{b}：{c}%',
            },
            data: this.data,
          },
        ],
      })
    },
  },
}
</script>

<style>
</style>
