<template>
  <div class="wealth-details">
    <basic-container>
      <div class="grid-container">
        <div class="title">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div class="title-wrapper">
              <div class="left">
                <iep-img style="width: 350px;height:300px;" :src="form.orgLogo" alt=""></iep-img>
                <div class="main">
                  <h4 class="investmentName">{{form.orgName}}</h4>
                  <div class="way">
                    <!-- <span>投资方式：{{way}}</span> -->
                    <span>投资人次：{{form.investmentNumber}}</span>
                  </div>
                  <div class="span-list">
                    <span v-for="(item,index) in form.abilityTag" :key="index">{{item}}</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>目标金额</div>
                <div>{{form.targetAmount}}</div>
                <el-button @click="handleAdd()" type="danger" size="medium" plain v-show="form.status==4">马上参与</el-button>
                <el-button type="warning" disabled size="medium" plain v-show="form.status==1">待审核</el-button>
                <el-button type="info" disabled size="medium" plain v-show="form.status==6">已结束</el-button>
                <el-button type="info" disabled size="medium" plain v-show="form.status==5 || form.status==2">待上架</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <IepAppTabCard title="基本信息">
            <div class="information-wrapper">
              <div>
                <div class="label">当前释放股权数量</div>
                <div class="num">{{form.allSharesNumber}}</div>
              </div>
              <div>
                <div class="label">当前股权单价</div>
                <div class="num">{{form.sharesUnivalent}}<span style="font-size:16px;color:#666;">（贝）</span></div>
              </div>
              <div>
                <div class="label">预计年化收益率</div>
                <div class="num" style="color:#c53b3e">{{form.returnRate}}%</div>
              </div>
              <div>
                <div class="label">最低起投金额</div>
                <div class="num">{{form.minimumAmount}}<span style="font-size:16px;color:#666;">（元）</span></div>
              </div>
              <div>
                <div class="label">投资人最低信用评分</div>
                <div class="num">{{form.minimumCredit}}</div>
              </div>
              <div>
                <div class="label">组织排行</div>
                <div class="num">9/15</div>
              </div>
            </div>
            <div class="schedule">
              <div class="schedule-title">投资进度</div>
              <div class="release">正式发布：2019-06-03</div>
              <div class="release">目标金额：￥{{form.targetAmount}}</div>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="form.percentage" status="exception" style="margin-top:10px;"></el-progress>
            </div>
          </IepAppTabCard>
        </div>
        <div>
          <IepAppTabCard title="业绩趋势">
            <ve-line :data="chartData" :settings="chartSettings" height="350px"></ve-line>
          </IepAppTabCard>
        </div>
        <div>
          <financial-report></financial-report>
        </div>
        <div>
          <investment-record></investment-record>
        </div>
        <div class="last-grid">
          <IepAppTabCard title="股东信息">
            <div class="shareholder-inform" v-for="(item, index) in shareholderData" :key="index">
              <div class="img">
                <iep-img :src="item.img" alt=""></iep-img>
                <span v-show="item.type" class="type">{{item.type}}</span>
              </div>
              <div class="row">股东：{{item.name}}</div>
              <div class="row">
                <span>持股：{{item.proportion}}</span>
                <span style="float:right;">{{item.time}}</span>
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
    this.chartSettings = {
      metrics: ['本组织', '组织业绩平均值对比'],
      dimension: ['日期'],
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
      },
      chartData: {
        columns: ['日期', '本组织', '组织业绩平均值对比'],
        rows: [
          { '日期': '2019-05-21', '本组织': 1393, '组织业绩平均值对比': 1093 },
          { '日期': '2019-05-22', '本组织': 2030, '组织业绩平均值对比': 1830 },
          { '日期': '2019-05-23', '本组织': 2223, '组织业绩平均值对比': 2123 },
          { '日期': '2019-05-24', '本组织': 2723, '组织业绩平均值对比': 2403 },
          { '日期': '2019-05-25', '本组织': 3592, '组织业绩平均值对比': 3492 },
          { '日期': '2019-05-26', '本组织': 4593, '组织业绩平均值对比': 4293 },
        ],
      },
      reportData: [
        { type: '类型' },
      ],
      shareholderData: [
        { img: '//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg', type: '企业', name: '国脉集团研发中心', proportion: '18%', time: '2019-05-21' },
        { img: '//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg', type: '', name: '国脉集团研发中心', proportion: '18%', time: '2019-05-21' },
        { img: '//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg', type: '企业', name: '国脉集团研发中心', proportion: '18%', time: '2019-05-21' },
        { img: '//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg', type: '企业', name: '国脉集团研发中心', proportion: '18%', time: '2019-05-21' },
        { img: '//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg', type: '企业', name: '国脉集团研发中心', proportion: '18%', time: '2019-05-21' },
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
}
.box-card {
  height: 100%;
}
.grid-container {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
  .title {
    grid-column-start: 1;
    grid-column-end: 3;
    display: grid;
    .title-wrapper {
      display: flex;
      .left {
        display: flex;
        flex-grow: 1;
        > img {
          width: 220px;
          height: 140px;
        }
        .main {
          padding-left: 20px;
          .investmentName {
            height: 50px;
            line-height: 50px;
            font-size: 20px;
          }
          .way > span {
            border: 1px solid #dcdfe6;
            margin-right: 10px;
            padding: 4px 10px;
            color: #666;
          }
          .span-list {
            display: inline-block;
            height: 60px;
            line-height: 60px;
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
        }
      }
      .right {
        width: 250px;
        > div:first-child {
          height: 30px;
          line-height: 30px;
        }
        > div:nth-child(2) {
          height: 40px;
          line-height: 40px;
          font-size: 22px;
          margin-bottom: 10px;
          &:before {
            content: "￥";
            font-size: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            color: #666;
            margin-left: -20px;
            text-align: center;
            display: inline-block;
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
        font-size: 16px;
        color: #666;
        height: 30px;
        line-height: 30px;
      }
      > .num {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .schedule {
    .schedule-title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
    }
    .release {
      padding-left: 10px;
      height: 35px;
      line-height: 35px;
    }
  }
  .shareholder-inform {
    width: 16%;
    float: left;
    margin: 0 22px;
    .img {
      width: 180px;
      height: 120px;
      position: relative;
      margin-bottom: 10px;
      > img {
        width: 180px;
        height: 120px;
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
</style>