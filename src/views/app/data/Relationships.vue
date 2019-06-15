<template>
  <div class="relationships">
    <div class="title">{{title}}</div>
    <ve-wordcloud height="240px" :data="chartData"></ve-wordcloud>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '标签云',
      chartData: {
        columns: ['word', 'count'],
        rows: [{
          'word': '项目管理',
          'count': 22199,
        }, {
          'word': '水巢DIPS',
          'count': 10288,
        }, {
          'word': '规划与咨询',
          'count': 620,
        }, {
          'word': '电子政务',
          'count': 274470,
        }, {
          'word': '营商环境',
          'count': 12311,
        }, {
          'word': '数据治理',
          'count': 1206,
        }, {
          'word': '信息资源',
          'count': 4885,
        }, {
          'word': '区块链',
          'count': 32294,
        }, {
          'word': '产品设计',
          'count': 18574,
        }, {
          'word': '国脉内网',
          'count': 38929,
        }, {
          'word': '市场开发',
          'count': 969,
        }, {
          'word': 'JAVA',
          'count': 37517,
        }, {
          'word': '智慧城市',
          'count': 12053,
        }, {
          'word': '智慧政府',
          'count': 57299,
        }, {
          'word': '规划',
          'count': 15418,
        }, {
          'word': '政策分析',
          'count': 22905,
        }, {
          'word': '淘渔吧',
          'count': 5146,
        }, {
          'word': '微服务',
          'count': 49487,
        }, {
          'word': '网站规划',
          'count': 33837,
        }, {
          'word': 'DNA',
          'count': 4500,
        }, {
          'word': 'DIPS',
          'count': 5744,
        }, {
          'word': 'IEP',
          'count': 4840,
        }, {
          'word': 'offsetCenter',
          'count': 232,
        }, {
          'word': 'inverse',
          'count': 3706,
        }, {
          'word': 'borderColor',
          'count': 4812,
        }, {
          'word': 'markLine',
          'count': 16578,
        }, {
          'word': 'line',
          'count': 76970,
        }, {
          'word': 'radiusAxis',
          'count': 6704,
        }, {
          'word': 'radar',
          'count': 15964,
        }, {
          'word': 'data',
          'count': 60679,
        }, {
          'word': 'dataZoom',
          'count': 24347,
        }, {
          'word': 'tooltip',
          'count': 43420,
        }, {
          'word': 'toolbox',
          'count': 25222,
        }, {
          'word': 'geo',
          'count': 16904,
        }, {
          'word': 'parallelAxis',
          'count': 4029,
        }],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.relationships {
  padding: 40px 20px 0;
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
