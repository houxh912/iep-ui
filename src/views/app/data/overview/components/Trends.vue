<template>
  <div class="receipt">
    <div class="title">{{title}}</div>
    <ve-histogram height="360px" :data="chartData" :extend="extend" :colors="colors"></ve-histogram>
  </div>
</template>

<script>
import { getResourceCount } from '@/api/app/cpms/channel'
export default {
  data () {
    this.colors = ['#d66368', '#02ac15']
    this.extend = {
      series: {
        label: {
          show: true,
          position: 'top',
        },
      },
      barWidth: '10',
    }
    return {
      boundaryGap: false,
      title: '国脉人分布',
      legendVisible: true,
      chartData: {
        columns: ['date', '数值'],
        rows: [
          { 'date': '材料库', 'prop': 'countMaterial', '数值': 0 },
          { 'date': '培训库', 'prop': 'countTraining', '数值': 0 },
          { 'date': '客户库', 'prop': 'countClient', '数值': 0 },
          { 'date': '资质库', 'prop': 'countHonor', '数值': 0 },
          { 'date': '商机库', 'prop': 'countOpportunity', '数值': 0 },
          { 'date': '专家库', 'prop': 'countExpert', '数值': 0 },
          { 'date': '产品库', 'prop': 'countProduct', '数值': 0 },
        ],
      },
    }
  },
  created () {
    getResourceCount().then(({data}) => {
      for (let item of this.chartData.rows) {
        item['数值'] = data.data[item.prop]
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.receipt {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    color: #333;
  }
}
</style>