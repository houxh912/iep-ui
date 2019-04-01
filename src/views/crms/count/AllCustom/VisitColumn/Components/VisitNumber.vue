<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale" :padding="[40,20,100,20]">
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
  { month: '周一', 核心客户: 1.0, 重要客户: 11, 一般客户: 5, 潜在客户: 2, 其他: 1 },
  { month: '周二', 核心客户: 2.0, 重要客户: 12, 一般客户: 11, 潜在客户: 5, 其他: 2 },
  { month: '周三', 核心客户: 3.0, 重要客户: 13, 一般客户: 12, 潜在客户: 2, 其他: 3 },
  { month: '周四', 核心客户: 4.0, 重要客户: 9, 一般客户: 1, 潜在客户: 3, 其他: 4 },
  { month: '周五', 核心客户: 3.0, 重要客户: 8, 一般客户: 12, 潜在客户: 12, 其他: 5 },
  { month: '周六', 核心客户: 2.0, 重要客户: 3, 一般客户: 11, 潜在客户: 8, 其他: 6 },
  { month: '周日', 核心客户: 1.0, 重要客户: 1, 一般客户: 1, 潜在客户: 2, 其他: 7 },
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['核心客户', '重要客户', '一般客户', '潜在客户', '其他'],
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
