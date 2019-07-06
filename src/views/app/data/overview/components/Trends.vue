<template>
  <div class="receipt">
    <div class="title">{{title}}</div>
    <ve-histogram height="360px" :data="chartData" :extend="extend" :colors="colors"></ve-histogram>
  </div>
</template>

<script>
import { getRecruitCount } from '@/api/app/hrms/'
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
          { 'date': '国脉同学', 'prop': 'userCount', '数值': 0 },
          { 'date': '外部同学', 'prop': 'externalCount', '数值': 0 },
          { 'date': '国脉专家', 'prop': 'expertCount', '数值': 0 },
          { 'date': '国脉校友', 'prop': 'alumnusCount', '数值': 0 },
          { 'date': '组织', 'prop': 'orgCount', '数值': 0 },
        ],
      },
    }
  },
  created () {
    getRecruitCount().then(({data}) => {
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