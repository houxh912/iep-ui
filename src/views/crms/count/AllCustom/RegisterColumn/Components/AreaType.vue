<template>
  <div>
    <ve-pie :data="chartData" :legend-visible="false" :extend="chartExtend" height="300px"></ve-pie>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
import { getAllDistrict } from '@/api/crms/count'
export default {
  data () {
    this.chartExtend = {
      color: ['#A9F0DF', '#D56368', '#F1C8C8', '#FFB880', '#F0F0A9', '#8D99B3', '#A9CCF0'],
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
      getAllDistrict().then((res) => {
        this.chartData.rows = res.data.data
      })
    },
  },
}
</script>
