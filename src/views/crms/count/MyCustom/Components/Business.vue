<template>
  <div>
    <ve-pie :data="chartData" :legend-visible="false" :extend="chartExtend" height="300px" :loading="loading"></ve-pie>
  </div>
</template>

<script>
import _ from 'lodash'
import 'v-charts/lib/style.css'
import { getMyBusiness } from '@/api/crms/count'
export default {
  data () {
    this.chartExtend = {
      color: ['#A9CCF0', '#8D99B3', '#F0F0A9', '#FFD9BC', '#F1C8C8'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}%',
      },
      label: {
        show: true,
        color: '#000',
        formatter: '{b}：{c}%',
      },
      series: {
        center: ['50%', '50%'],
      },
    }
    return {
      loading: true,
      data: [
        { value: '0', name: '咨询', label: 'consulting' },
        { value: '0', name: '数据', label: 'information' },
        { value: '0', name: '软件', label: 'softwareNumber' },
        { value: '0', name: '平台', label: 'platform' },
        { value: '0', name: '事项', label: 'matters' },
      ],
      chartData: {
        columns: ['name', 'value'],
        rows: [],
      },
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getMyBusiness().then((res) => {
        if (res) {
          this.loading = false
        }
        Object.keys(res.data.data).forEach((item) => {
          var index = _.findIndex(this.data, function (o) { return o.label == item })
          this.data[index].value = res.data.data[item]
        })
        this.chartData.rows = this.data
      })
    },
  },
}
</script>

<style>
</style>
