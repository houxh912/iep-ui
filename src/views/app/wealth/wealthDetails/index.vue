<template>
  <div class="wealth-details">
    <basic-container>
      <div class="grid-container">
        <div class="title">
          <el-card shadow="always" class="box-card" :body-style="bodyStyle">
            <div class="title-wrapper">
              <div class="left">
                <div class="main">
                  <h4 class="investmentName">{{form.orgName}}<span class="number">（参与人数：{{form.investmentNumber}}）</span></h4>
                  <div class="span-list">
                    <span v-for="(item,index) in form.abilityTag" :key="index">{{item}}</span>
                  </div>
                  <div class="share-price">
                    <span style="font-size:16px;">今日股价：</span>
                    <span style="font-size:30px;color:#ba1b20;margin:0 20px 0 5px;">138.8</span>
                    <span style="font-size:14px;">日涨幅：</span>
                    <span style="font-size:14px;color:#ba1b20">3.88+0.25%</span>
                  </div>
                  <div class="release-bottom">
                    <span><span class="schedule-title-sub">当前金额：</span>{{form.hadMoney}}（元）</span>
                    <span><span class="schedule-title-sub">目标金额：</span>{{form.targetAmount}}（元）</span></div>
                  <el-progress :text-inside="true" :stroke-width="8" :percentage="form.percentage" status="success" style="margin-top:10px;"></el-progress>
                  <iep-button style="width: 140px;height: 44px;font-size: 15px;color: #fff;background-color: #ba1b20;border-radius: 4px;margin-top: 30px;">马上参与</iep-button>
                </div>
              </div>
              <div class="right">
                <div class="title">股价走势图<span class="right-tab">年</span><span class="right-tab">月</span><span class="right-tab tab-active">周</span></div>
                <ve-line :colors="colors" :data="chartData" :settings="chartSettings" height="300px"></ve-line>
              </div>
            </div>
          </el-card>
        </div>
        <div class="basic-info-achievement">
          <IepAppTabCard title="基本信息">
            <div class="information-wrapper">
              <div>
                <div class="label">当前释放股权数量</div>
                <div class="num">{{form.allSharesNumber}}</div>
              </div>
              <div>
                <div class="label">当前股权单价</div>
                <div class="num">{{form.sharesUnivalent}}<span style="font-size:12px;">（贝）</span></div>
              </div>
              <!-- <div>
                <div class="label">预计年化收益率</div>
                <div class="num" style="color:#c53b3e">{{form.returnRate}}%</div>
              </div> -->
              <div>
                <div class="label">最低起投金额</div>
                <div class="num">{{form.minimumAmount}}<span style="font-size:12px;">（元）</span></div>
              </div>
              <div>
                <div class="label">投资人最低信用评分</div>
                <div class="num">{{form.minimumCredit}}</div>
              </div>
              <div>
                <div class="label">组织排行</div>
                <div class="num">--</div>
              </div>
            </div>
            <div class="schedule">
              <div class="schedule-title">投资进度</div>
              <div class="release"><span class="schedule-title-sub">正式发布：</span>2019-06-03</div>

            </div>
          </IepAppTabCard>
        </div>
        <div class="basic-info-achievement">

        </div>
        <div>
          <financial-report></financial-report>
        </div>
        <div>
          <investment-record></investment-record>
        </div>
        <div class="last-grid">
          <IepAppTabCard title="股东信息" :tip="`当前持股${form.currentShareholding}  还有${form.residualShareholding}股份未认购`">
            <div class="shareholder-inform" v-for="(item, index) in form.shareholderInformation" :key="index">
              <div class="img">
                <iep-img class="avatar" :src="item.avatar" alt=""></iep-img>
                <!-- <span v-show="item.type" class="type">{{item.type}}</span> -->
              </div>
              <div class="row"><span class="name">股东：</span>{{item.name}}</div>
              <div class="row">
                <span><span class="name">持股数量：</span>{{item.proportion}}</span>
                <!-- <span style="float:right;font-size:12px;color:#999;">{{item.time}}</span> -->
              </div>
            </div>
          </IepAppTabCard>
        </div>
      </div>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getInvestmentById, joinInvestment } from '@/api/fams/investment'
import mixins from '@/mixins/mixins'
import { initForm } from './options'
import DialogForm from './DialogForm'
import InvestmentRecord from './InvestmentRecord'
import FinancialReport from './FinancialReport'
export default {
  mixins: [mixins],
  components: { DialogForm, InvestmentRecord, FinancialReport },
  data () {
    this.colors = ['#d66368', '#eebc7d']
    this.chartSettings = {
      metrics: ['本组织'],
      dimension: ['time'],
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
        sharesUnivalent: '',
        returnRate: '',
        minimumAmount: '',
        minimumCredit: '',
        ranking: '9/15',
        officialRelease: '2019-04-22',
        record: [
          { id: '', userName: '', totalAmount: '', status: '', updateTime: '' },
        ],//投资记录
        currentShareholding: '0%',
        residualShareholding: '0%',
        shareholderInformation: [],
      },
      chartData: {
        columns: ['time', '本组织'],
        rows: [],
      },
      reportData: [
        { type: '类型' },
      ],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getInvestmentById(this.id).then(({ data }) => {
        this.form = data.data
        this.form.percentage = this.form.hadMoney / this.form.targetAmount * 100
        let list = data.data.performanceTrend.map(m => { return { time: m.name, '本组织': m.amount } })
        this.$set(this.chartData, 'rows', list)
      })
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = joinInvestment
      this.$refs['DialogForm'].form.investmentId = this.id
      this.$refs['DialogForm'].form.orgId = this.form.orgId
      this.$refs['DialogForm'].form.orgName = this.form.orgName
      this.$refs['DialogForm'].form.minimumBuy = this.form.minimumBuy
      this.$refs['DialogForm'].form.remainSharesNumber = this.form.remainSharesNumber
      this.$refs['DialogForm'].form.sharesUnivalent = this.form.sharesUnivalent
      this.$refs['DialogForm'].dialogShow = true
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
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
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
            width: 630px;
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
  .information-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    > div {
      width: 33%;
      flex: 0 0 33%;
      padding-left: 10px;
      margin-bottom: 20px;
      > .label {
        font-size: 14px;
        color: #666;
        height: 30px;
        line-height: 30px;
      }
      > .num {
        display: flex;
        align-items: flex-end;
        font-size: 20px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .schedule {
    .schedule-title {
      font-size: 14px;
      height: 50px;
      line-height: 50px;
    }
  }
  .shareholder-inform {
    width: 16%;
    float: left;
    margin: 0 22px;
    cursor: pointer;
    .img {
      width: 180px;
      height: 120px;
      position: relative;
      margin-bottom: 10px;
      overflow: hidden;
      text-align: center;
      .avatar {
        height: 100px !important;
        width: 100px !important;
        border-radius: 50%;
        overflow: hidden;
        margin: auto;
      }
      .el-image {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
      > img {
        width: 180px;
        height: 120px;
      }
      .name {
        color: #999;
      }
      .type {
        position: absolute;
        top: 10px;
        right: 5px;
        padding: 0 5px;
        border: 1px solid #c53b3e;
        border-radius: 4px;
        background-color: #ecebe9;
        color: #c53b3e;
      }
    }
    .row {
      color: #666;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
  .last-grid {
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
  height: 416px;
}
.title >>> .el-card__body {
  padding: 20px 10px;
}
.financial-investment >>> .el-table__body-wrapper {
  height: 290px;
  overflow: auto;
  overflow-x: hidden;
}
.financial-investment >>> .el-table__body-wrapper::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.financial-investment >>> .el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  transition: 0.3s background-color;
}
.financial-investment >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  transition: 0.3s background-color;
  display: none;
  transition: all 0.5s;
}
.financial-investment
  >>> .el-table__body-wrapper:hover::-webkit-scrollbar-thumb {
  display: block;
}
</style>