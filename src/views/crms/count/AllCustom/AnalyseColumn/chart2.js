const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '咨询', count: 20.0 },
  { item: '数据', count: 21.0 },
  { item: '软件', count: 30.0 },
  { item: '平台', count: 9.0 },
  { item: '事项', count: 20.0 },
]

const scale1 = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  },
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent',
})
const data1 = dv.rows
export { scale1, data1 }
