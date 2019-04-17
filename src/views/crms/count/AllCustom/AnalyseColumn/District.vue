<template>
  <div>
    <div id="district" :style="{width: '450px', height: '300px'}"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getMyDistrict } from '@/api/crms/count'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      data: [
        { value: '0', name: '部委', label: 'ministriesCommissions' },
        { value: '0', name: '省级', label: 'provincialLevel' },
        { value: '0', name: '市级', label: 'cities' },
        { value: '0', name: '区县', label: 'county' },
        { value: '0', name: '园区', label: 'park' },
        { value: '0', name: '企业', label: 'enterprise' },
        { value: '0', name: '其他', label: 'other' }],
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
      getMyDistrict().then((res) => {
        var that = this
        Object.keys(res.data.data).forEach((item) => {
          var index = _.findIndex(that.data, function (o) { return o.label == item })
          that.data[index].value = res.data.data[item]
        })
        this.draw()
      })
    },
    draw () {
      let myChart = echarts.init(document.getElementById('district'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}：{c}%',
        },
        color: ['#A9F0DF', '#D56368', '#F1C8C8', '#FFB880', '#F0F0A9', '#8D99B3', '#A9CCF0'],
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
