const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '咨询', count: 35.5 },
  { item: '数据', count: 21.6 },
  { item: '软件', count: 15.5 },
  { item: '平台', count: 19.0 },
  { item: '事项', count: 10.4 },
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
