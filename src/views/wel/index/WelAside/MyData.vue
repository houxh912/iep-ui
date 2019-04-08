<template>
  <div>
    <div class="title">{{creatList.title}}</div>
    <v-chart force-fit="true" height="300" :padding="padding" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis :dataKey="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" />
      <v-axis :dataKey="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
      <v-legend dataKey="user" marker="circle" :offset="30" />
      <v-coord type="polar" :radius="0.8" />
      <v-line position="item*score" color="user" :size="2" />
      <v-point position="item*score" color="user" :size="4" shape="circle" />
      <v-area position="item*score" color="user" />
    </v-chart>
    <h4 style="text-align:center;">内网综合指数：1112</h4>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '工作', 去年: 70, 今年: 30 },
  { item: '学习', 去年: 60, 今年: 70 },
  { item: '管理', 去年: 50, 今年: 60 },
  { item: '协作', 去年: 40, 今年: 50 },
  { item: '财富增值', 去年: 60, 今年: 70 },
  { item: '服务创新', 去年: 60, 今年: 70 },
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['去年', '今年'],
  key: 'user',
  value: 'score',
})
const data = dv.rows

const scale = [{
  dataKey: 'score',
  min: 0,
  max: 100,
}]

const axis1Opts = {
  dataKey: 'item',
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null,
    },
    hideFirstLine: false,
  },
}
const axis2Opts = {
  dataKey: 'score',
  line: null,
  tickLine: null,
  grid: {
    type: 'polygon',
    lineStyle: {
      lineDash: null,
    },
  },
}

export default {
  data () {
    return {
      creatList: { title: '我的指数' },
      data,
      scale,
      padding: [20, 20, 80, 20],
      axis1Opts,
      axis2Opts,
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
