<template>
  <iep-fams-card title="集团资产">
    <template slot="right">
      <div style="width: 350px;">
        <iep-date-picker v-model="rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="small">
        </iep-date-picker>
      </div>
    </template>
    <div class="total-wrapper">
      <div class="total-item" v-for="(item, index) in financialData" :key="index">
        <div class="value">{{item | parseToMoney}}</div>
        <div class="label"><a href="#">{{index}}</a></div>
      </div>
    </div>
  </iep-fams-card>
</template>
<script>
import { getGroupAssetsByDate } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    return {
      rangeTime: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      financialData: {
        '发行量': 0,
        '系统账户余额': 0,
        '系统支出': 0,
        '系统收入': 0,
        '提现数': 0,
        '项目应收款': 0,
        '其他应收款': 0,
        '组织借款': 0,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getGroupAssetsByDate(this.rangeTime)
      const realData = data.data
      console.log(realData)
      this.financialData['发行量'] = realData.circulation
      this.financialData['系统账户余额'] = realData.balance
      this.financialData['系统支出'] = realData.expenditure
      this.financialData['系统收入'] = realData.income
      this.financialData['提现数'] = realData.putForward
      this.financialData['项目应收款'] = realData.project
      this.financialData['其他应收款'] = realData.other
      this.financialData['组织拆借'] = realData.borrow
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
}
</style>
