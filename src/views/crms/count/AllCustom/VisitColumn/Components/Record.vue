<template>
  <div>
    <div v-if="this.chartData.rows.length == 0" class="center"><span>暂无客户出单拜访记录</span></div>
    <div v-else>
      <ve-ring :data="chartData" :settings="chartSettings" :extend="chartExtend" height="300px"></ve-ring>
    </div>
  </div>
</template>

<script>
import { getAllRecord } from '@/api/crms/count'
export default {
  data () {
    this.chartSettings = {
      roseType: 'radius',
      legendLimit: 10,
    },
      this.chartExtend = {
        legend: {
          orient: 'vertical',
          left: 0,
          aligin: 'auto',
        },
        series: {
          center: ['50%', '50%'],
        },
      }
    return {
      chartData: {
        columns: ['marketManager', 'contactQuantity'],
        rows: [],
      },
    }
  },
  created () {
    getAllRecord().then((res) => {
      this.chartData.rows = res.data.data
    })
  },
}
</script>
<style scoped>
.center {
  text-align: center;
  line-height: 300px;
}
</style>

