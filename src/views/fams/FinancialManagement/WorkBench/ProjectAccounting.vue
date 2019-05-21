<template>
  <iep-fams-card title="项目核算">
    <template slot="right">
      <el-radio-group v-model="timeType" size="small">
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="year">年</el-radio-button>
      </el-radio-group>
    </template>
    <div class="processing-wrapper">
      <div class="processing-data">
        <ve-line :data="chartData" :extend="extend"></ve-line>
      </div>
      <a-list class="processing-select" :grid="{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }" :dataSource="selectMap">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card>{{item.label}}({{item.value}})</a-card>
        </a-list-item>
      </a-list>
    </div>
  </iep-fams-card>
</template>
<script>
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    this.extend = {
      'xAxis.0.axisLabel.rotate': 45,
    }
    return {
      timeType: 'week',
      chartData: {
        columns: ['日期', '收入', '支出', '利润'],
        rows: [
          { '日期': '1月', '收入': 1393, '支出': 1093, '利润': 0.32 },
          { '日期': '2月', '收入': 3530, '支出': 3230, '利润': 0.26 },
          { '日期': '3月', '收入': 2923, '支出': 2623, '利润': 0.76 },
          { '日期': '4月', '收入': 1723, '支出': 1423, '利润': 0.49 },
          { '日期': '5月', '收入': 3792, '支出': 3492, '利润': 0.323 },
          { '日期': '6月', '收入': 4593, '支出': 4293, '利润': 0.78 },
          { '日期': '7月', '收入': 1393, '支出': 1093, '利润': 0.32 },
          { '日期': '8月', '收入': 3530, '支出': 3230, '利润': 0.26 },
          { '日期': '9月', '收入': 2923, '支出': 2623, '利润': 0.76 },
          { '日期': '10月', '收入': 1723, '支出': 1423, '利润': 0.49 },
          { '日期': '11月', '收入': 3792, '支出': 3492, '利润': 0.323 },
          { '日期': '12月', '收入': 4593, '支出': 4293, '利润': 0.78 },
        ],
      },
      selectMap: [
        { label: '提现', value: 75 },
        { label: '发票', value: 75 },
        { label: '开票', value: 75 },
        { label: '组织拆借', value: 75 },
        { label: '资金调拨', value: 75 },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  justify-content: space-between;
}
.processing-wrapper {
  display: flex;
  .processing-select {
    flex: 1;
  }
  .processing-data {
    border-right: 1px solid #e8e8e8;
    padding-right: 15px;
    margin-right: 15px;
    flex: 2;
  }
}
</style>
