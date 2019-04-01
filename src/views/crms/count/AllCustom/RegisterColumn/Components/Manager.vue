<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-coord type="rect" direction="LT" />
      <v-tooltip />
      <v-legend />
      <v-axis dataKey="value" position="right" />
      <v-axis dataKey="label" :label="label" />
      <v-bar position="label*value" color="type" :adjust="adjust" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { label: '张佩瑜', 客户: 150, 联系人: 80 },
  { label: '中艺桥.', 客户: 58, 联系人: 23 },
  { label: '何依婷.', 客户: 123, 联系人: 22 },
  { label: '王俊辉.', 客户: 78, 联系人: 120 },
  { label: '毛莹莹', 客户: 170, 联系人: 100 },
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['客户', '联系人'],
  color: 'red',
  key: 'type',
  value: 'value',
})
const data = dv.rows

const label = { offset: 12 }
const adjust = [{ type: 'dodge', marginRatio: 1 / 32 }]
export default {
  data () {
    return {
      data,
      height: 300,
      label: label,
      adjust: adjust,
    }
  },
}
</script>

<style>
</style>
