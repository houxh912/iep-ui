<template>
  <div class="performance">
    <div class="title">{{title}}</div>
    <ve-line height="330px" :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
  </div>
</template>

<script>
import { getGroupReceipts } from '@/api/fams/group_wealth_flow'
export default {
  data () {
    this.colors = ['#d66368', '#eebc7d']
    this.chartSettings = {
      metrics: [`${new Date().getFullYear()}年`],
      dimension: ['date'],
    }
    return {
      title: '收款情况',
      chartData: {
        columns: ['date', this.chartSettings.metrics],
        rows: [],
      },
    }
  },
  created () {
    getGroupReceipts().then(({data}) => {
      // 取最近的7个月
      let month = new Date().getMonth()
      let list = []
      let amount = this.chartSettings.metrics
      if (month < 7) {
        list = data.data.slice(0, 7)
      } else {
        list = data.data.slice(month - 7, month)
      }
      for (let item of list) {
        item.date = `${new Date(item.name).getMonth() + 1}月`,
        item[amount] = item.amount
      }
      this.$set(this.chartData, 'rows', list)
    })
  },
}
</script>
<style lang="scss" scoped>
.performance {
  padding: 20px 0 0;
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