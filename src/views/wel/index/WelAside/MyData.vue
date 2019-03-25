<template>
  <div>
    <v-chart force-fit="true" height="250" :padding="padding" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis :dataKey="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" />
      <v-axis :dataKey="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
      <v-legend dataKey="user" marker="circle" :offset="30" />
      <v-coord type="polar" :radius="0.8" />
      <v-line position="item*score" color="user" :size="2" />
      <v-point position="item*score" color="user" :size="4" shape="circle" />
      <v-area position="item*score" color="user" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'Design', 去年: 70, 今年: 30 },
  { item: 'Development', 去年: 60, 今年: 70 },
  { item: 'Marketing', 去年: 50, 今年: 60 },
  { item: 'Users', 去年: 40, 今年: 50 },
  { item: 'Test', 去年: 60, 今年: 70 },
  { item: 'Language', 去年: 70, 今年: 50 },
  { item: 'Technology', 去年: 50, 今年: 40 },
  { item: 'Support', 去年: 30, 今年: 40 },
  { item: 'Sales', 去年: 60, 今年: 40 },
  { item: 'UX', 去年: 50, 今年: 60 },
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
  max: 80,
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
      data,
      scale,
      padding: [20, 20, 95, 20],
      axis1Opts,
      axis2Opts,
    }
  },
}
</script>
