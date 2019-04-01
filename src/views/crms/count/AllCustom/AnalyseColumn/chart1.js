const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '部委', count: 10.0 },
  { item: '省级', count: 20.0 },
  { item: '地市', count: 10.0 },
  { item: '区县', count: 12.0 },
  { item: '园区', count: 8.0 },
  { item: '企业', count: 30.0 },
  { item: '其他', count: 10.0 },
]

const scale = [
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
const data = dv.rows
export { scale, data }
