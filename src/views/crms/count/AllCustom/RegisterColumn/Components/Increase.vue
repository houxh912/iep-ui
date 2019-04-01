<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-line position="month*temperature" color="city" />
      <v-point position="month*temperature" color="city" :size="4" :v-style="style" :shape="'circle'" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { month: '周一', 客户: 7.0, 联系人: 3.9 },
  { month: '周二', 客户: 6.9, 联系人: 4.2 },
  { month: '周三', 客户: 9.5, 联系人: 5.7 },
  { month: '周四', 客户: 14.5, 联系人: 8.5 },
  { month: '周五', 客户: 13.0, 联系人: 11.9 },
  { month: '周六', 客户: 8.9, 联系人: 5.6 },
  { month: '周日', 客户: 2.3, 联系人: 2.3 },
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['客户', '联系人'],
  key: 'city',
  value: 'temperature',
})
const data = dv.rows

const scale = [{
  dataKey: 'month',
  min: 0,
  max: 1,
}]

export default {
  data () {
    return {
      data,
      scale,
      height: 300,
      style: { stroke: '#fff', lineWidth: 1 },
    }
  },
}
</script>
