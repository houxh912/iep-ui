<template>
  <div>
     <ve-ring :data="chartData" :settings="chartSettings" :extend="chartExtend" height="300px"></ve-ring>
  </div>
</template>

<script>
export default {
  data () {
    this.chartSettings = {
        roseType: 'radius',
       
    },
    this.chartExtend = {
      legend:{   
        orient: 'vertical',
        left:0,
        aligin:'auto',
      },
      series:{
        center:['50%','50%'],
      },
    }
    return {
       chartData: {
          columns: ['name', 'value'],
          rows: [
            { name: '刘大力', value: 41.8 },
            { name: '王浩', value: 38 },
            { name: '李四', value: 33.7 },
            { name: '张三', value: 30.7 },
            { name: '寒冬', value: 25.8 },
            { name: '夏凉', value: 31.7 },
            { name: '秋霜', value: 33 },
            { name: '春雪', value: 46 },
          ],
        },
    }
  },
}
</script>
