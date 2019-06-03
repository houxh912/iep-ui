<template>
  <div class="wealth-details">
    <basic-container>
      <div class="grid-container">
        <div class="title">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div class="title-wrapper">
              <div class="left">
                <img :src="img" alt="">
                <div class="main">
                  <h4 class="investmentName">{{investmentName}}</h4>
                  <div class="way">
                    <span>投资方式：{{way}}</span>
                    <span>投资人次：{{peopleNumber}}</span>
                  </div>
                  <div class="span-list">
                    <span v-for="(item,index) in spanList" :key="index">{{item}}</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>目标金额</div>
                <div>{{targetAmount}}</div>
                <el-button type="danger" size="medium" plain>马上参与</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <IepAppTabCard title="基本信息">
            <div class="information-wrapper" v-for="(item, index) in informationData" :key="index">
              <div>
                <div class="label">当前释放股权数量</div>
                <div class="num">{{item.sum}}</div>
              </div>
              <div>
                <div class="label">当前股权单价</div>
                <div class="num">{{item.price}}<span style="font-size:16px;color:#666;">（贝）</span></div>
              </div>
              <div>
                <div class="label">预计年化收益率</div>
                <div class="num" style="color:#c53b3e">{{item.rate}}</div>
              </div>
              <div>
                <div class="label">最低起投金额</div>
                <div class="num">{{item.lowest}}<span style="font-size:16px;color:#666;">（元）</span></div>
              </div>
              <div>
                <div class="label">投资人最低信用评分</div>
                <div class="num">{{item.credit}}</div>
              </div>
              <div>
                <div class="label">组织排行</div>
                <div class="num">{{item.ranking}}</div>
              </div>
            </div>
            <div class="schedule">
              <div class="schedule-title">投资进度</div>
              <div class="release">正式发布：{{officialRelease}}</div>
              <div class="release">目标金额：￥{{targetAmount}}</div>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception" style="margin-top:10px;"></el-progress>
            </div>
          </IepAppTabCard>
        </div>
        <div>
          <IepAppTabCard title="业绩趋势">
            <ve-line :data="chartData" :settings="chartSettings" height="350px"></ve-line>
          </IepAppTabCard>
        </div>
        <div>
          <IepAppTabCard title="财务报告">
            <el-table :data="reportData" style="width: 100%">
              <el-table-column prop="type" label="资产类型">
              </el-table-column>
              <el-table-column prop="type" label="金额">
              </el-table-column>
              <el-table-column prop="type" label="升降（同期）">
              </el-table-column>
              <el-table-column prop="type" label="更新时间">
              </el-table-column>
            </el-table>
          </IepAppTabCard>
        </div>
        <div>
          <IepAppTabCard title="投资记录">
            <el-table :data="recordingData" style="width: 100%">
              <el-table-column prop="type" label="序号" width="60px;">
              </el-table-column>
              <el-table-column prop="type" label="投资人">
              </el-table-column>
              <el-table-column prop="type" label="投资金额（元）">
              </el-table-column>
              <el-table-column prop="type" label="支付方式">
              </el-table-column>
              <el-table-column prop="type" label="投资时间">
              </el-table-column>
            </el-table>
          </IepAppTabCard>
        </div>
        <div class="last-grid">
          <IepAppTabCard title="股东信息">
            <div class="shareholder-inform" v-for="(item, index) in shareholderData" :key="index">
              <div class="img">
                <img :src="item.img" alt="">
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
  </div>
</template>
<script>
import { getInvestmentById } from '@/api/fams/investment'
export default {
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
      investmentName: '舟山国脉研发中心',
      img: '//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg',
      way: '股权投资',
      peopleNumber: '34',
      spanList: ['产品设计', '产品设计', '产品设计', '产品设计'],
      targetAmount: '2,000,000,000.00',
      informationData: [{ sum: '2000000', price: '100', rate: '2.613%', lowest: '1000', credit: '800', ranking: '9/15' }],
      officialRelease: '2019-04-22',
      chartData: {
        columns: ['日期', '本组织', '组织业绩平均值对比'],
        rows: [
          { '日期': '2019-05-21', '本组织': 1393, '组织业绩平均值对比': 1093 },
          { '日期': '2019-05-22', '本组织': 3530, '组织业绩平均值对比': 3230 },
          { '日期': '2019-05-23', '本组织': 2923, '组织业绩平均值对比': 2623 },
          { '日期': '2019-05-24', '本组织': 1723, '组织业绩平均值对比': 1423 },
          { '日期': '2019-05-25', '本组织': 3792, '组织业绩平均值对比': 3492 },
          { '日期': '2019-05-26', '本组织': 4593, '组织业绩平均值对比': 4293 },
        ],
      },
      reportData: [
        { type: '类型' },
      ],
      recordingData: [
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
        console.log(data.data)
        this.investmentName = data.data.orgName
      })
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
</style>