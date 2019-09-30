<template>
  <div class="introduction">
    <div class="title">
      <span class="name">财务报表</span>
      <div class="right">
        <span>选择年份：</span>
        <iep-date-picker v-model="businessDate" type="year" placeholder="请选择年份">
        </iep-date-picker>
      </div>
    </div>
    <div class="top">
      <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
    </div>
    <div class="bottom" v-for="(item,index) in dataList" :key="index">
      <span>{{item.name}}</span>
      <span>{{item.amount}}</span>
      <span>{{item.beforeDayAmount}}</span>
      <span>{{item.lastMonthAmount}}</span>
      <!-- <span>{{item.season}}%</span> -->
    </div>
  </div>
</template>

<script>
import { getStatements } from '@/api/fams/investment'
export default {
  data () {
    return {
      businessDate: new Date(),
      businessYear: new Date().getFullYear(),
      titleList: ['数据项', '金额', '昨日变动', '上月变动'],
      dataList: [
        // { name: '总估值', beforeDayAmount: '505505', lastMonthAmount: '10' },
        // { name: '账户余额', beforeDayAmount: '505505', lastMonthAmount: '10' },
        { name: '合同金额', sign: 'signedProject', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '待签合同', sign: 'pendingProject', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '应收账款', sign: 'accountsReceivable', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        // { name: '负资产', amount:'',beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '项目收入', sign: 'projectIncome', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '其他收入', sign: 'otherIncome', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '费用总额', sign: 'totalCost', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '营业利润', sign: 'operatingProfit', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
        { name: '净利润', sign: 'netProfit', amount: '-', beforeDayAmount: '-', lastMonthAmount: '-' },
      ],
    }
  },
  computed: {
    id () {
      return this.$route.params.id ? +this.$route.params.id : null
    },
  },
  methods: {
    loadPage () {
      this.loading = true
      getStatements({ year: this.businessYear, investmentId: this.id }).then(({ data }) => {
        for (let i in this.dataList) {
          let sign = this.dataList[i].sign
          this.dataList[i].amount = data.data.data[sign].amount
          this.dataList[i].yesterdayAmount = data.data.data[sign].yesterdayAmount
          if (data.data.data[sign].beforeDayAmount == 0) {
            this.dataList[i].beforeDayAmount = '-'
          }
          else {
            this.dataList[i].beforeDayAmount = (data.data.data[sign].yesterdayAmount - data.data.data[sign].beforeDayAmount) / data.data.data[sign].beforeDayAmount
            this.dataList[i].beforeDayAmount = Math.round(this.dataList[i].beforeDayAmount * 10000) / 100 + '%'
          }
          if (data.data.data[sign].lastMonthAmount == 0) {
            this.dataList[i].lastMonthAmount = '-'
          }
          else {
            this.dataList[i].lastMonthAmount = (data.data.data[sign].yesterdayAmount - data.data.data[sign].lastMonthAmount) / data.data.data[sign].lastMonthAmount
            this.dataList[i].lastMonthAmount = Math.round(this.dataList[i].lastMonthAmount * 10000) / 100 + '%'
          }

        }

        this.loading = false
      })
    },
  },
  created () {
    this.loadPage()
  },
  watch: {
    businessDate () {
      this.loadPage()
    },
  },
}
</script>
<style lang="scss" scoped>
.introduction {
  .title {
    .name {
      font-size: 16px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
    }
    .right {
      float: right;
    }
  }
  .top,
  .bottom {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    background-color: #fafafa;
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns:
      minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)
      minmax(100px, 1fr);
    > span {
      text-align: center;
    }
    > span:first-child {
      text-align: left;
      padding-left: 20px;
    }
  }
  .bottom {
    height: 52px;
    line-height: 52px;
    text-align: left;
    margin-top: 0;
    background-color: #fff;
    &:hover {
      background-color: #fafafa;
    }
  }
}
</style>
