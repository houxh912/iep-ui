<template>
  <div>
    <div class="title">我的指数</div>
    <ve-radar :data="chartData" :settings="chartSettings" :legendVisible="isTrue"></ve-radar>
    <h4 style="text-align:center;">内网综合指数：0</h4>
  </div>
</template>

<script>

export default {
  data () {
    this.chartSettings = {
      labelMap: {
        date: '日期',
        work: '工作',
        study: '学习',
        creative: '服务创新',
        weath: '财富增值',
        admin: '管理',
        xz: '协作',
      },
      lineStyle: {
        color: '#fff',
      },
      areaStyle: {
        opacity: 0.2,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red', // 0% 处的颜色
          }, {
            offset: 1, color: 'orange', // 100% 处的颜色
          }],
          global: false, // 缺省为 false
        },
      },
    }
    this.isTrue = false
    return {
      chartData: {
        columns: ['date', 'creative', 'work', 'study', 'weath', 'admin', 'xz'],
        rows: [
          {
            date: '去年', 'weath': 0, 'creative': 0, 'work': 0, 'study': 0, 'admin': 0, 'xz': 0,
          },
          {
            date: '今年', 'weath': 0, 'creative': 0, 'work': 0, 'study': 0, 'admin': 0, 'xz': 0,
          },
        ],
      },
    }
  },
}
</script>
<style  lang="scss" scoped>
.title {
  padding: 0 10px 10px;
  font-size: 16px;
  font-weight: 500;
}
</style>
