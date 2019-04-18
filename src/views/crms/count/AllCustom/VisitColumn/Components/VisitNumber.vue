<template>
  <ve-line :data="chartData" :settings="chartSetting" :extend="chartExtend" height="300px" :loading="loading"></ve-line>
</template>

<script>
import 'v-charts/lib/style.css'
export default {
  data () {
    this.chartSetting = {
      legendName: ['核心客户', '重要客户', '潜在客户', '一般客户', '其他'],
    }
    this.chartExtend = {
      color: ['#D97075', '#F0F0A9', '#A9CCF0', '#8A94AF', '#FBB781'],
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
        columns: ['日期', '核心客户', '重要客户', '潜在客户', '一般客户', '其他'],
        rows: [
          { '日期': '周一', '核心客户': 100, '重要客户': 22, '潜在客户': 1, '一般客户': 55, '其他': 33 },
          { '日期': '周二', '核心客户': 35, '重要客户': 22, '潜在客户': 33, '一般客户': 42, '其他': 22 },
          { '日期': '周三', '核心客户': 56, '重要客户': 3, '潜在客户': 12, '一般客户': 54, '其他': 11 },
          { '日期': '周四', '核心客户': 22, '重要客户': 32, '潜在客户': 33, '一般客户': 55, '其他': 0 },
          { '日期': '周五', '核心客户': 11, '重要客户': 22, '潜在客户': 33, '一般客户': 12, '其他': 22 },
          { '日期': '周六', '核心客户': 0, '重要客户': 12, '潜在客户': 33, '一般客户': 32, '其他': 44 },
          { '日期': '周日', '核心客户': 55, '重要客户': 55, '潜在客户': 33, '一般客户': 25, '其他': 88 },
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