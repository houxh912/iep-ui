<template>
  <div class="receipt">
    <div class="title">{{title}}</div>
    <ve-histogram :data="chartData" :extend="extend" :colors="colors"></ve-histogram>
  </div>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#02ac15']
    this.extend = {
      series: {
        label: {
          show: true,
          position: 'top',
        },
      },
      barWidth: '10',
    }
    return {
      title: '人员变动趋势',
      legendVisible: true,
      chartData: {
        columns: ['日期', '增加', '减少'],
        rows: [
          { '日期': '1月', '增加': 20 },
          { '日期': '2月', '增加': 15 },
          { '日期': '3月', '增加': 13 },
          { '日期': '4月', '减少': 10 },
          { '日期': '5月', '减少': 4 },
          { '日期': '6月', '增加': 15 },
          { '日期': '7月', '增加': 18 },
          { '日期': '8月', '增加': 26 },
          { '日期': '9月', '减少': 9 },
          { '日期': '10月', '减少': 1 },
          { '日期': '11月', '减少': 3 },
          { '日期': '12月', '增加': 15 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.receipt {
  position: relative;
  .title {
    position: absolute;
    left: 20px;
    top: 0;
    font-size: 18px;
    color: #333;
  }
}
</style>