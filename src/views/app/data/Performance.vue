<template>
  <div class="performance">
    <div class="title">{{title}}</div>
    <ve-line height="400px" :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
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
    return {
      title: '收款情况',
      chartData: {
        columns: ['日期', '2018年', '2019年'],
        rows: [
          { '日期': '一月', '2018年': 139, '2019年': 109 },
          { '日期': '二月', '2018年': 353, '2019年': 230 },
          { '日期': '三月', '2018年': 292, '2019年': 262 },
          { '日期': '四月', '2018年': 172, '2019年': 142 },
          { '日期': '五月', '2018年': 392, '2019年': 492 },
          { '日期': '六月', '2018年': 459, '2019年': 429 },
          { '日期': '七月', '2018年': 593, '2019年': 293 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.performance {
  padding: 20px 0 0;
  position: relative;
  .title {
    position: absolute;
    left: 0;
    top: 18px;
    font-size: 18px;
    color: #333;
  }
}
</style>