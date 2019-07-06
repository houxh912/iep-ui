<template>
  <div class="relationships">
    <div class="title">{{title}}</div>
    <ve-wordcloud height="240px" :data="chartData"></ve-wordcloud>
  </div>
</template>

<script>
import { getRectagsList } from '@/api/app/tms/index'
export default {
  data () {
    return {
      title: '标签云',
      chartData: {
        columns: ['name', 'refers'],
        rows: [],
      },
    }
  },
  created () {
    getRectagsList().then(({data}) => {
      this.chartData.rows = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.relationships {
  padding: 40px 20px 0;
  position: relative;
  .title {
    position: absolute;
    left: 0;
    top: 18px;
    font-size: 18px;
    color: #333;
  }
}
</style>
