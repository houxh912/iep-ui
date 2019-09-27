<template>
  <div>
    <ve-pie :data="chartData" :legend-visible="false" :extend="chartExtend" height="300px"></ve-pie>
  </div>
</template>

<script>
// import _ from 'lodash'
import 'v-charts/lib/style.css'
import { getAllClientRela } from '@/api/crms/count'
export default {
  data () {
    this.chartExtend = {
      color: ['#A9CCF0', '#8D99B3', '#F0F0A9', '#FFD9BC', '#F1C8C8'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}个 ({d}%)',
      },
      label: {
        show: true,
        color: '#000',
        formatter: '{b}：{d}%',
      },
      series: {
        center: ['50%', '50%'],
      },
    }
    return {
      sourceData: '',
      chartData: {
        columns: ['planUpload', 'other'],
        rows: [],
      },
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getAllClientRela().then((res) => {
        this.chartData.rows = res.data.data
        // if (res) {
        //   this.loading = false
        // }
        // Object.keys(res.data.data).forEach((item) => {
        //   var index = _.findIndex(this.data, function (o) { return o.label == item })
        //   this.data[index].value = res.data.data[item]
        // })
        // this.chartData.rows = this.data
      })
    },
  },
}
</script>
