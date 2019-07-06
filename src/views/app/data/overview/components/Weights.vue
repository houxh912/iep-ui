<template>
  <div class="weights">
    <div class="title">{{title}}</div>
    <ve-funnel height="240px" :legend-visible="legendVisible" :data="chartData" :settings="chartSettings" :colors="colors"></ve-funnel>
    <div class="zhezhao"></div><!-- 临时的遮罩层，将所有的点击效果全部挡住 -->
  </div>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#aaccf1', '#eebc7d', '#f0c8c8']
    this.chartSettings = {
      sequence: ['人才', '客户', '项目', '财务'],
    }
    return {
      title: '资产构成',
      legendVisible: false,
      chartData: {
        columns: ['label', 'value'],
        rows: [
          { 'label': '人才', 'value': 1200 },
          { 'label': '客户', 'value': 500 },
          { 'label': '项目', 'value': 300 },
          { 'label': '财务', 'value': 100 },
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
    left: 0;
    top: 18px;
    font-size: 18px;
    color: #333;
  }
  .zhezhao {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
}
</style>