<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-tooltip />
      <v-coord type="polar" :innerRadius="0.2" />
      <v-sector position="name*value" color="name" :vStyle="sectorStyle" />
      <v-legend position="left" dataKey="name" :offsetX="0" />
    </v-chart>
  </div>
</template>

<script>
const data = [
  { name: '刘大力', value: 41.8 },
  { name: '王浩', value: 38 },
  { name: '李四', value: 33.7 },
  { name: '张三', value: 30.7 },
  { name: '寒冬', value: 25.8 },
  { name: '夏凉', value: 31.7 },
  { name: '秋霜', value: 33 },
  { name: '春雪', value: 46 },
  { name: '李四', value: 38.3 },
  { name: '春雪', value: 28 },
  { name: '刘大力', value: 42.5 },
  { name: '寒冬', value: 30.3 },
]

export default {
  data () {
    return {
      data,
      height: 300,
      sectorStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
    }
  },
}
</script>
