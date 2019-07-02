<template>
  <div class="receipt">
    <div class="title">{{title}}</div>
    <ve-histogram height="400px" :data="chartData" :extend="chartExtend" :settings="chartSettings" :colors="colors" :mark-point="markPoint"></ve-histogram>
  </div>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#eebc7d']
    this.chartSettings = {
      metrics: ['2018年', '2019年'],
      dimension: ['日期'],
    }
    this.chartExtend = {
      barWidth: '10',
    }
    this.markPoint = {
      data: [
        {
          name: '最大值',
          type: 'max',
        },
        {
          name: '最小值',
          type: 'min',
        },
      ],
    }
    return {
      title: '业绩变化',
      chartData: {
        columns: ['日期', '2018年', '2019年'],
        rows: [
          { '日期': '1月', '2018年': 13, '2019年': 93 },
          { '日期': '2月', '2018年': 53, '2019年': 23 },
          { '日期': '3月', '2018年': 92, '2019年': 62 },
          { '日期': '4月', '2018年': 37, '2019年': 92 },
          { '日期': '5月', '2018年': 93, '2019年': 93 },
          { '日期': '6月', '2018年': 59, '2019年': 29 },
          { '日期': '7月', '2018年': 13, '2019年': 18 },
          { '日期': '8月', '2018年': 53, '2019年': 30 },
          { '日期': '9月', '2018年': 29, '2019年': 62 },
          { '日期': '10月', '2018年': 72, '2019年': 42 },
          { '日期': '11月', '2018年': 79, '2019年': 92 },
          { '日期': '12月', '2018年': 93, '2019年': 29 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.receipt {
  position: relative;
  padding: 20px 0 0;
  .title {
    position: absolute;
    left: 0;
    top: 18px;
    font-size: 18px;
    color: #333;
  }
}
</style>