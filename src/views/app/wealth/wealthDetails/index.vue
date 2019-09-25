<template>
  <div class="wealth-details iep-basic-scroll">
    <basic-container>
      <div class="grid-container">
        <div class="title">
          <el-card shadow="always" class="box-card" :body-style="bodyStyle">
            <div class="title-wrapper">
              <div class="left">
                <div class="main">
                  <h4 class="investmentName">{{form.orgName}}<span class="number">（参与人次：{{form.investmentNumber}}）</span></h4>
                  <div class="span-list">
                    <span v-for="(item,index) in form.abilityTag" :key="index">{{item}}</span>
                  </div>
                  <div class="share-price">
                    <span style="font-size:16px;">今日股价：</span>
                    <span style="font-size:32px;color:#ba1b20;margin:0 20px 0 5px;">{{form.sharesUnivalent}}</span>
                    <span style="font-size:14px;">日涨幅：</span>
                    <span style="font-size:14px;color:#ba1b20">{{form.dailyGain}}</span>
                  </div>
                  <div class="release-bottom">
                    <span class="schedule-title-sub">已购数量：{{form.purchasedNumber}}（股）</span>
                    <span class="schedule-title-sub">发行数量：{{form.circulationNumber}}（股）</span></div>
                  <el-progress :text-inside="true" :stroke-width="8" :percentage="form.percentage" status="success" style="margin-top:10px;"></el-progress>
                  <iep-button type="danger" style="width: 140px;height: 44px;font-size: 15px;border-radius: 4px;margin-top: 30px;" @click="handleAdd" :disabled="!form.circulationNumber">马上参与</iep-button>
                </div>
              </div>
              <div class="right">
                <div class="title">股价走势图
                  <!-- <span class="right-tab" :class="trendActive=='year'?'tab-active':''" @click="trendTab('year')">年</span> -->
                  <span class="right-tab" :class="trendActive=='month'?'tab-active':''" @click="trendTab('month')">月</span>
                  <span class="right-tab" :class="trendActive=='week'?'tab-active':''" @click="trendTab('week')">周</span></div>
                <ve-line :colors="colors" :data="chartData" :grid="grid" :settings="chartSettings" height="300px"></ve-line>
              </div>
            </div>
          </el-card>
        </div>
        <div class="main-tab">
          <description :org="{orgId:form.orgId,orgName:form.orgName}" :record='form.record'></description>
        </div>
        <div class="main-tab-right">
          <div class="basic-info-achievement">
            <IepAppTabCard title="基本信息">
              <div class="information-wrapper">
                <div>
                  <div class="num">{{form.allSharesNumber}}</div>
                  <div class="label">总股本</div>
                </div>
                <div>
                  <div class="num">{{form.circulationNumber}}</div>
                  <div class="label">发行股份数量</div>
                </div>
                <!-- <div>
                  <div class="num">444</div>
                  <div class="label">投资人最低信用分</div>
                </div> -->
                <!-- <div>
                  <div class="num">444</div>
                  <div class="label">发行价</div>
                </div> -->
                <div>
                  <div class="num">{{form.shareholder}}</div>
                  <div class="label">股东人数</div>
                </div>
                <div>
                  <div class="num">{{form.realName}}</div>
                  <div class="label">审核人</div>
                </div>
              </div>
            </IepAppTabCard>
          </div>
          <div class="top-ten-shareholders">
            <IepAppTabCard title="十大股东">
              <div class="top">
                <span>股东姓名</span>
                <span>持股数量</span>
                <span>持股比例</span>
              </div>
              <el-scrollbar style="height:204px">
                <div class="shareholders-wrapper" v-for="(item,index) in form.shareholderInformation" :key="index">
                  <iep-div-detail v-if="item.holdType==2" :value="item.orgName"></iep-div-detail>
                  <iep-div-detail v-else-if="item.holdType==4" :value="item.other"></iep-div-detail>
                  <iep-div-detail v-else :value="item.name"></iep-div-detail>
                  <span>{{item.proportion}}</span>
                  <span>{{Math.round(item.proportion/form.allSharesNumber * 10000) / 100 >1?Math.round(item.proportion/form.allSharesNumber * 10000) / 100:'&lt;1'}} %</span>
                </div>
              </el-scrollbar>
            </IepAppTabCard>
          </div>
        </div>
        <div class="risks-rules">
          <notification></notification>
        </div>
        <!-- <div class="last-grid">
          <IepAppTabCard title="历史访客" :tip="`累计访客${form.currentShareholding}，访问人次${form.residualShareholding}次`">
            <div class="shareholder-inform" v-for="(item, index) in form.shareholderInformation" :key="index">
              <div class="img">
                <iep-img class="avatar" :src="item.avatar" alt=""></iep-img>
              </div>
              <span class="name">{{item.name}}</span>
            </div>
          </IepAppTabCard>
        </div> -->
      </div>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getInvestmentById, joinInvestment, getChartData } from '@/api/fams/investment'
import mixins from '@/mixins/mixins'
import { initForm } from './options'
import DialogForm from './DialogForm'
import description from './description'
import notification from './notification'
export default {
  mixins: [mixins],
  components: { DialogForm, description, notification },
  data () {
    this.colors = ['#d66368', '#eebc7d']
    this.chartSettings = {
      metrics: ['股价走势', '涨跌额'],
      dimension: ['time'],
    }

    this.grid = {
      y2: 20,
    }
    return {
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      form: {
        percentage: 0,
        status: '',
        orgName: '',
        orgLogo: '',
        orgId: '',
        //way: '股权投资',
        investmentNumber: '',
        abilityTag: [],
        targetAmount: '',
        hadMoney: '',
        allSharesNumber: '',
        returnRate: '',
        minimumAmount: '',
        minimumCredit: '',
        ranking: '9/15',
        officialRelease: '2019-04-22',
        record: [
          { id: '', name: '', orgName: '', holdType: 0, totalAmount: '', status: '', updateTime: '' },
        ],//投资记录
        shareholderInformation: [],
        shareholder: 0,//股东人数
        purchasedNumber: 0,//已购股数
        circulationNumber: 0,//发现数量
        sharesUnivalent: 0,//每股单价
        yesterDayPrice: 0,//昨日单价
        dailyGain: '-',//日涨幅
        realName: '暂无',//审核人
      },
      chartData: {
        columns: ['time', '股价走势', '涨跌额'],
        rows: [],
      },
      reportData: [
        { type: '类型' },
      ],
      shareholdersList: [
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
        { name: '安三个', number: 11, bili: 22 },
      ],
      trendActive: 'week',
      trendCharts: [],
      trendType: 1,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
    this.getChart()
  },
  methods: {
    loadPage () {
      getInvestmentById(this.id).then(({ data }) => {
        this.form = data.data
        this.form.percentage = this.form.purchasedNumber / this.form.circulationNumber * 100
        const chazhi = this.form.sharesUnivalent - this.form.yesterDayPrice
        if (this.form.yesterDayPrice) {
          this.form.dailyGain = chazhi.toFixed(2).toString() + '+' + Math.round(chazhi / this.form.yesterDayPrice * 10000) / 100 + '%'
        }
        else {
          this.form.dailyGain = '-'
        }
        if (!this.form.realName) {
          this.form.realName = '暂无'
        }
      })
    },
    getChart () {
      getChartData({ type: this.trendType, investmentId: this.id }).then(({ data }) => {
        this.trendCharts = data.data.map(m => { return { time: m.createTime, '股价走势': m.currentPrice, '涨跌额': 0 } })
        for (let i in this.trendCharts) {
          if (i > 0) {
            this.trendCharts[i]['涨跌额'] = this.trendCharts[i]['股价走势'] - this.trendCharts[i - 1]['股价走势']
          }
        }
        this.$set(this.chartData, 'rows', this.trendCharts)
      })
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = joinInvestment
      this.$refs['DialogForm'].form.investmentId = this.id
      this.$refs['DialogForm'].form.orgId = this.form.orgId
      this.$refs['DialogForm'].form.orgName = this.form.orgName
      this.$refs['DialogForm'].form.remainingShares = this.form.circulationNumber - this.form.purchasedNumber
      this.$refs['DialogForm'].form.tradingPrice = this.form.sharesUnivalent
      this.$refs['DialogForm'].dialogShow = true
    },
    trendTab (val) {
      this.trendActive = val
      if (val == 'week') {
        this.trendType = 1
      }
      else if (val == 'month') {
        this.trendType = 2
      }
      this.getChart()
      this.$set(this.chartData, 'rows', this.trendCharts)
    },
  },
}
</script>

<style lang="scss" scoped>
.wealth-details {
  width: 1200px;
  margin: 0 auto;
  .basic-container {
    padding-top: 0;
  }
}
.box-card {
  height: 100%;
}
.grid-container {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 300px);
  .title {
    grid-column-start: 1;
    grid-column-end: 3;
    .title-wrapper {
      display: grid;
      grid-auto-flow: row dense;
      grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
      .left {
        display: flex;
        flex-grow: 1;
        align-items: center;
        > img {
          width: 194px;
          height: 124px;
        }
        .el-image {
          border: 1px solid #ebeef5;
          width: 194px;
          height: 124px;
        }
        .main {
          width: 100%;
          border-right: 1px solid #ebeef5;
          padding: 0 40px 20px 20px;
          .investmentName {
            margin-bottom: 5px;
            height: 40px;
            line-height: 40px;
            font-size: 24px;
            .number {
              font-size: 14px;
              color: #999;
              margin-left: 10px;
            }
          }
          .span-list {
            width: 100%;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            :after {
              content: "/";
              width: 30px;
              text-align: center;
              display: inline-block;
            }
            :last-child:after {
              display: none;
            }
            > span {
              color: #666;
            }
          }
          .share-price {
            height: 60px;
            line-height: 60px;
            margin-bottom: 20px;
          }
          .release-bottom {
            height: 30x;
            line-height: 30x;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            align-items: center;
            .schedule-title-sub {
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
      .right {
        flex-grow: 1;
        padding-left: 20px;
        .title {
          font-size: 16px;
          .right-tab {
            float: right;
            margin: 0 15px;
            cursor: pointer;
            &:nth-child(2) {
              position: relative;
              &:after {
                content: "|";
                position: absolute;
                right: -16px;
                top: -1px;
                color: #999;
              }
            }
            &:nth-child(3) {
              position: relative;
              &:after {
                content: "|";
                position: absolute;
                right: -16px;
                top: -1px;
                color: #999;
              }
            }
          }
          .tab-active {
            color: #ba1b20;
          }
        }
      }
    }
  }
  .shareholder-inform {
    width: 5%;
    float: left;
    margin: 0 22px;
    cursor: pointer;
    text-align: center;
    .img {
      width: 50px;
      height: 50px;
      position: relative;
      margin: 0 auto 10px;
      overflow: hidden;
      text-align: center;
      .avatar {
        height: 50px !important;
        width: 50px !important;
        border-radius: 50%;
        overflow: hidden;
        margin: auto;
      }
      .name {
        color: #999;
      }
    }
  }
  .main-tab {
  }
  .main-tab-right {
    .basic-info-achievement {
      .information-wrapper {
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        > div {
          width: 50%;
          margin-bottom: 20px;
          text-align: center;
          > .label {
            font-size: 14px;
            color: #666;
            height: 30px;
            line-height: 30px;
          }
          > .num {
            font-size: 20px;
            height: 30px;
            line-height: 30px;
            color: #c53b3e;
          }
        }
      }
    }
    .top-ten-shareholders {
      margin-top: 20px;
      .top,
      .shareholders-wrapper {
        display: flex;
        height: 40px;
        line-height: 40px;
        > span,
        > el-popover {
          width: 33%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover {
          background-color: #fafafa;
        }
      }
      .top {
        background-color: #fafafa;
      }
    }
  }
  .last-grid,
  .risks-rules {
    grid-column-start: 1;
    grid-column-end: 3;
    display: grid;
  }
}
</style>
<style scoped>
.wealth-details >>> .el-table th {
  background-color: #fafafa;
}
.wealth-details >>> .el-table tr {
  cursor: pointer;
}
.wealth-details >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wealth-details >>> .el-button {
  margin: 0;
}
.wealth-details >>> .el-progress-bar__innerText {
  display: none;
}
.basic-info-achievement >>> .el-card,
.financial-investment >>> .el-card {
  height: 240px;
}
.title >>> .el-card__body {
  padding: 20px 10px;
}
.financial-investment >>> .el-table__body-wrapper {
  height: 290px;
  overflow: auto;
  overflow-x: hidden;
}
.wealth-details >>> .iep-ellipsis {
  width: 33%;
  text-align: center;
}
.wealth-details >>> .el-scrollbar__bar.is-vertical > div{
  height: 100%;
}
</style>