<template>
  <ve-line :data="chartData" :settings="chartSetting" :extend="chartExtend" height="300px" :loading="loading"></ve-line>
</template>

<script>
import 'v-charts/lib/style.css'
export default {
  data () {
    this.chartSetting = {
      legendName: ['客户', '联系人'],
    }
    this.chartExtend = {
      color: ['#D56368', '#DDDDDD'],
      legend: {
        show: 'true',
        bottom: 0,
      },
      xAxis: {
        min: '周一',
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },

      },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '40',
        top: '5%',
        containLabel: true,
      },
      series: {
        type: 'line',
        smooth: false,
        lineStyle: {
        },

      },
    }
    return {
      loading: false,
      type: '1',

      chartData: {
        columns: ['日期', '客户', '联系人'],
        rows: [
          { '日期': '周一', '客户': 100, '联系人': 22 },
          { '日期': '周二', '客户': 35, '联系人': 22 },
          { '日期': '周三', '客户': 56, '联系人': 3 },
          { '日期': '周四', '客户': 22, '联系人': 32 },
          { '日期': '周五', '客户': 11, '联系人': 22 },
          { '日期': '周六', '客户': 0, '联系人': 12 },
          { '日期': '周日', '客户': 55, '联系人': 55 },
        ],
      },
    }
  },
  methods: {
    searchPage () {
      this.$message.success('功能开发中')
    },
    changeType () {
      this.$message.success('功能开发中')

    },
  },
}
</script>