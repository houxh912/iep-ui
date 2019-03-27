<template>
  <div class="wapper-main">
    <div class="main-top">
      <el-card class="left" shadow="hover">
        <h4 class="title">总资产</h4>
        <ul>
          <li>
            <span class="num">6233.5</span>
            <span class="sub-title">账户余额</span>
          </li>
          <li>
            <span class="num">8000</span>
            <span class="sub-title">发票额度</span>
          </li>
          <li>
            <span class="num">2000</span>
            <span class="sub-title">冻结金额</span>
          </li>
          <li>
            <span class="num">3000</span>
            <span class="sub-title">已提现</span>
          </li>
          <li>
            <span class="num">6233.5</span>
            <span class="sub-title">今日国脉贝</span>
          </li>
        </ul>
      </el-card>
      <el-card class="right" shadow="hover">
        <h4 class="title">快捷入口</h4>
        <ul>
          <li>互助基金</li>
          <li>发票提交</li>
          <li>开票通知</li>
          <li>我要提现</li>
          <li>我要打赏</li>
          <li>我要投资</li>
        </ul>
      </el-card>
    </div>
    <div class="content">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='AssetsStatistics'" v-slot:AssetsStatistics>
          <assets-statistics v-loading="activeTab !=='AssetsStatistics'"></assets-statistics>
        </template>
        <template v-if="activeTab ==='WealthFlowing'" v-slot:WealthFlowing>
          <wealth-flowing v-loading="activeTab !=='WealthFlowing'"></wealth-flowing>
        </template>
        <template v-if="activeTab ==='WithdrawCash'" v-slot:WithdrawCash>
          <withdraw-cash v-loading="activeTab !=='WithdrawCash'"></withdraw-cash>
        </template>
        <template v-if="activeTab ==='Invoice'" v-slot:Invoice>
          <invoice v-loading="activeTab !=='Invoice'"></invoice>
        </template>
        <template v-if="activeTab ==='MutualFund'" v-slot:MutualFund>
          <mutual-fund v-loading="activeTab !=='MutualFund'"></mutual-fund>
        </template>
        <template v-if="activeTab ==='Investment'" v-slot:Investment>
          <investment v-loading="activeTab !=='Investment'"></investment>
        </template>
        <template v-if="activeTab ==='InvoiceNotice'" v-slot:InvoiceNotice>
          <invoice-notice v-loading="activeTab !=='InvoiceNotice'"></invoice-notice>
        </template>
      </iep-tabs>
    </div>
  </div>
</template>
<script>
import IepTabs from '@/components/IepCommon/Tabs'
import AssetsStatistics from './AssetsStatistics/'
import WealthFlowing from './WealthFlowing/'
import WithdrawCash from './WithdrawCash/'
import Invoice from './Invoice/'
import MutualFund from './MutualFund/'
import Investment from './Investment/'
import InvoiceNotice from './InvoiceNotice/'
export default {
  components: { IepTabs, AssetsStatistics, WealthFlowing, WithdrawCash, Invoice, MutualFund, Investment, InvoiceNotice },
  data () {
    return {
      tabList: [{
        label: '资产统计',
        value: 'AssetsStatistics',
      }, {
        label: '财富流水',
        value: 'WealthFlowing',
      }, {
        label: '提现',
        value: 'WithdrawCash',
      }, {
        label: '发票',
        value: 'Invoice',
      }, {
        label: '互助基金',
        value: 'MutualFund',
      }, {
        label: '投资',
        value: 'Investment',
      }, {
        label: '开票通知',
        value: 'InvoiceNotice',
      }],
      activeTab: 'AssetsStatistics',
    }
  },
}
</script>
<style lang="scss" scoped>
.wapper-main {
  padding: 20px;
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .main-top,
  ul {
    display: flex;
    justify-content: space-between;
    alignitems: center;
  }
  .main-top {
    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .left {
      flex: 1;
      margin-right: 20px;
      li {
        padding: 10px 40px;
        border-right: 1px solid #ebeef5;
        &:last-child {
          border: 0;
        }
      }
    }
    .right {
      flex: 0 0 300px;
      ul {
        justify-content: flex-start;
        flex-wrap: wrap;
        alignitems: center;
        li {
          padding: 10px 15px;
        }
      }
    }
    ul {
      span {
        display: block;
        text-align: center;
      }
      .num {
        font-size: 24px;
      }
      .sub-title {
        color: #999;
      }
    }
  }
  .content {
    margin-top: 20px;
  }
}
</style>
<style lang="css" scoped>
.wapper-main >>> .iep-tabs .el-tabs__item {
  font-size: 16px;
}
</style>