<template>
  <div>
    <ve-pie :data="chartData" :legend-visible="false" :extend="chartExtend" height="300px"></ve-pie>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
import { getMyClientRela } from '@/api/crms/count'
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
      getMyClientRela().then((res) => {
        this.chartData.rows = res.data.data
      })
    },
  },
}
</script>

