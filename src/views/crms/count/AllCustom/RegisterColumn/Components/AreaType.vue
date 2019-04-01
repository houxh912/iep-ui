<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="[40,20,40,60]">
      <v-tooltip :showTitle="false" :itemTpl="itemTpl" />
      <v-axis />
      <v-coord type="theta" :radius="0.5" />
      <v-pie position="percent" :color="'type'" :label="label" :select="false" :vStyle="style" :tooltip="tooltip" />
      <v-view :data="viewData" :scale="scale">
        <v-coord type="theta" :radius="0.75" :innerRadius="0.5 / 0.75" />
        <v-pie position="percent" :color="color" label="name" :select="false" :vStyle="style" :tooltip="tooltip" />
      </v-view>
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { value: 251, type: '一季度', name: '1月' },
  { value: 1048, type: '一季度', name: '2月' },
  { value: 610, type: '一季度', name: '3月' },
  { value: 434, type: '二季度', name: '4月' },
  { value: 335, type: '二季度', name: '5月' },
  { value: 250, type: '二季度', name: '6月' },
  { value: 250, type: '三季度', name: '7月' },
  { value: 250, type: '三季度', name: '8月' },
  { value: 250, type: '三季度', name: '9月' },
  { value: 250, type: '四季度', name: '10月' },
  { value: 250, type: '四季度', name: '11月' },
  { value: 250, type: '四季度', name: '12月' },
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent',
})
const data = dv.rows

const viewDv = new DataSet.View().source(sourceData)
viewDv.transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent',
})
const viewData = viewDv.rows

const scale = {
  dataType: 'percent',
  formatter: '.2%',
}

const itemTpl = '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'

const style = {
  lineWidth: 1,
  stroke: '#fff',
}

const label = ['type', { offset: -10 }]

const tooltip = [
  'name*percent', (item, percent) => {
    percent = (percent * 100).toFixed(2) + '%'
    return {
      name: item,
      value: percent,
    }
  },
]

const color = ['name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']]

export default {
  data () {
    return {
      data,
      scale,
      viewData,
      height: 300,
      itemTpl,
      tooltip,
      color,
      label,
      style,
    }
  },
}
</script>
