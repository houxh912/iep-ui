<template>
  <div class="weights">
    <div class="title">{{title}}</div>
    <ve-funnel height="240px" :legend-visible="legendVisible" :data="chartData" :settings="chartSettings" :colors="colors"></ve-funnel>
  </div>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#aaccf1', '#eebc7d', '#f0c8c8']
    this.chartSettings = {
      sequence: ['工资', '奖金', '提成', '投资'],
    }
    return {
      title: '资产构成',
      legendVisible: false,
      chartData: {
        columns: ['状态', '数值'],
        rows: [
          { '状态': '工资', '数值': 1200 },
          { '状态': '奖金', '数值': 500 },
          { '状态': '提成', '数值': 300 },
          { '状态': '投资', '数值': 100 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.weights {
  padding: 50px 20px 0;
  position: relative;
  .title {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 16px;
    color: #333;
  }
}
</style>