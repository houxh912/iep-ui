<template>
  <div>
    <basic-container>
      <div class="main-top">
        <el-card class="left" shadow="never">
          <h4 class="title">总资产</h4>
          <div v-if="accountType === 0" class="total-wrapper">
            <div class="total-item" v-for="(item, index) in financialData" :key="index">
              <el-tooltip v-if="index=='现金'" class="item" effect="dark" content="现金=提现现金+工资银行卡部分" placement="bottom">
                <div class="value">{{item}}</div>
              </el-tooltip>
              <div v-else class="value">{{item}}</div>
              <div class="label"><a href="#" @click="$openPage(typeUrlMap[index])">{{index}}</a></div>
            </div>
          </div>
          <div v-if="accountType === 1" class="no-treasure-data">
            <el-button @click="handleGoOpenAccount()" round>去工作台开通账户并提取1000国脉贝</el-button>
          </div>
          <div v-if="accountType === 2" class="no-treasure-data">
            <el-button @click="handleGoOpenAccount()" round>去工作台提取1000国脉贝</el-button>
          </div>
        </el-card>
        <el-card class="right" shadow="never">
          <h4 class="title">快捷入口</h4>
          <ul>
            <li @click="$openPage('/wel/wealth/mutual_fund')">互助基金</li>
            <li @click="$openPage('/wel/wealth/invoice')">报销申请</li>
            <li @click="$openPage('/wel/wealth/billing_notice')">开票申请</li>
            <li @click="$openPage('/wel/wealth/withdraw')">我要提现</li>
            <li @click="handleReward()">我要打赏</li>
            <li @click="handleToReward()">我要投资</li>
          </ul>
        </el-card>
      </div>
      <div class="content">
        <el-card shadow="never">
          <operation-container>
            <template slot="left">
              <iep-page-header title="国脉贝财富统计" :replaceText="replaceText" :data="['（此功能暂未开放）']"></iep-page-header>
            </template>
            <template slot="right">
              <div class="time">
                <div class="time-text">
                  <span>昨日</span>
                  <span>今日</span>
                  <span>本周</span>
                  <span>本月</span>
                  <span class="active">全年</span>
                </div>
              </div>
            </template>
          </operation-container>
          <iep-divider />
          <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="colors"></ve-histogram>
        </el-card>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { getTotal } from '@/api/fams/total'
export default {
  data () {
    this.colors = [
      (paramsA) => {
        var colorList1 = ['#d66368', '#d97276', '#dd8184', '#da8a8d', '#e09c9e', '#e8adaf', '#f7c6c8', '#ffdfe0']
        return colorList1[paramsA.dataIndex]
      },
      (paramsB) => {
        var colorList2 = ['#f58f44', '#f79349', '#f79a55', '#f9a261', '#f7af78', '#f9b37f', '#fdc296', '#fdd1b0']
        return colorList2[paramsB.dataIndex]
      },
    ]
    this.chartSettings = {
      metrics: ['收入', '支出'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },

    }
    this.chartExtend = {
      barWidth: '26',
      itemStyle: {
        barBorderRadius: 13,
      },

    }
    return {
      replaceText: (data) => `${data[0]}`,
      accountType: 0,
      financialData: {
        '已提现金': 0,
        '国脉贝': 0,
        '冻结金额': 0,
        '发票额度': 0,
        '投资': 0,
        '其他': 0,
      },
      chartData: {
        columns: ['dept', '收入', '支出'],
        rows: [
          { 'dept': '内网', '收入': 0, '支出': 0 },
          { 'dept': '部门', '收入': 0, '支出': 0 },
          { 'dept': '提现', '收入': 0, '支出': 0 },
          { 'dept': '批评', '收入': 0, '支出': 0 },
          { 'dept': '学习', '收入': 0, '支出': 0 },
          { 'dept': '打赏', '收入': 0, '支出': 0 },
          { 'dept': '其他', '收入': 0, '支出': 0 },
        ],
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapActions(['famsReward']),
    handleGoOpenAccount () {
      this.$openPage('/')
    },
    handleReward () {
      this.famsReward()
    },
    handleToReward () {
      this.$router.push('/app/wealth')
    },
    async loadPage () {
      const { data } = await getTotal()
      if (data.data) {
        this.financialData['国脉贝'] = data.data.govmadeBell
        this.financialData['冻结金额'] = data.data.lockBell
        this.financialData['发票额度'] = data.data.withInvoice
        this.financialData['现金'] = data.data.cash
        this.financialData['投资'] = data.data.stockRight
        this.financialData['其他'] = data.data.other
        this.accountType = 0
      } else {
        this.accountType = +data.msg
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 14px 0;
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

<style lang="scss" scoped>
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
  align-items: center;
}
.main-top {
  .title {
    margin: 0;
    font-size: 20px;
  }
  .left {
    flex: 1;
    margin-right: 20px;
    height: 152px;
    li {
      padding: 12px 40px;
      border-right: 1px solid #ebeef5;
      &:last-child {
        border: 0;
      }
    }
  }
  .right {
    flex: 0 0 300px;
    height: 152px;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      li {
        cursor: pointer;
        padding: 10px 15px;
        cursor: pointer;
        &:hover {
          color: $--menu-color-primary;
        }
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
</style>

<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .time-text {
    span {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: $--menu-color-primary;
      }
    }
    span.active {
      color: $--menu-color-primary;
    }
  }
  .block {
    width: 40%;
  }
}
.no-treasure-data {
  display: flex;
  height: 82px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #f3f3f3;
  padding: 15px 0;
}
</style>
