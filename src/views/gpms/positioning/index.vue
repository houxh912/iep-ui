<template>
  <div>
    <basic-container>
      <iep-page-header title="我的定位">
        <template>
          <el-button class="modify" size="small" @click="handleClicks" type="primary" plain>项目PK</el-button>
        </template>
      </iep-page-header>
      <div class="title-box">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <p style="color:#666;" v-if="myData.exponent>0">您的个人项目(参与度)指数为
                <span style="font-size:24px;color:#ba1a22;">{{myData.exponent}}</span>
                ！您是一个
                <span style="color:#000;">{{myData.badge}}</span>
                的
                <span style="color:#000;">{{myData.dignity}}</span>
                ，尤其擅长
                <span style="color:#000;">{{myData.projectTagList}}</span>
                主题的项目。</p>
              <p v-else style="font-size:24px;color:#ba1a22;">您还未参与任何项目</p>
              <p style="color:#666;">请继续努力，发挥自身价值，成为更优秀的国脉人！</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="counter-box">
        <div class="title">
          资产分布
          <div style="float: right;">
            <el-tooltip placement="right">
              <div slot="content" class="Blackwindow">
                参与项目总数（个）：{{myData.participateCount>0?myData.participateCount:0}}<br />
                项目合同总金额（万元）: {{myData.contractCount>0?myData.contractCount:0}}<br />
                担任项目经理次数（次）：{{myData.conscientiousCount>0?myData.conscientiousCount:0}}<br />
                担任项目成员次数（次）：{{myData.infoAsMemberCount>0?myData.infoAsMemberCount:0}}<br />
                <!-- 分享项目材料总数（个）：<br />
                平均水平：国脉人的平均数据<br />
                同期水平：与当前用户入司时间相近的国脉人的平均数据 -->
              </div>
              <span class="say"><i class='iconfont icon-zhuyi'></i>分布说明</span>
            </el-tooltip>
          </div>
        </div>
        <div class="counter-chart">
          <div class="piece">
            <h4>参与项目个数（个）</h4>
            <ve-histogram :data="chartDataHistogram" :settings="chartSettingsHistogram" :extend="chartExtendHistogram" :colors="colorsHistogram"></ve-histogram>
          </div>
          <div class="piece">
            <h4>参与项目合同总金额（万元）</h4>
            <!-- <el-tabs v-model="contractAmount">
              <el-tab-pane label="我的" name="my"></el-tab-pane>
              <el-tab-pane label="总数" name="all"></el-tab-pane>
            </el-tabs> -->
            <ve-ring :data="chartDataRing" :settings="chartSettingsRing" :colors="colorsRing" :title="title">
            </ve-ring>
          </div>
          <div class="piece">
            <h4>担任项目经理次数（次）</h4>
            <project-manager ref="projectManager" :myData="myData"></project-manager>
          </div>
          <div class="piece">
            <h4>担任市场经理次数（次）</h4>
            <market-manager ref="marketManager" :myData="myData"></market-manager>
          </div>
          <div class="piece">
            <h4>担任项目督导指导项目次数（次）</h4>
            <div class="down">
              <div class="down-box">
                <span class="title">总数</span>
                <div class="main">
                  <div class="main-box">
                    <span>指导项目：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="myData.guidanceAllCount==0?0:myData.guidanceCount/myData.guidanceAllCount*100" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>{{myData.guidanceCount}}</span>
                  </div>
                  <div class="main-box">
                    <span>审核项目：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="myData.guidanceExternalAllCount==0?0:myData.guidanceApprovalCount/myData.guidanceExternalAllCount*100" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>{{myData.guidanceApprovalCount}}</span>
                  </div>
                </div>
              </div>
              <div class="down-box">
                <span class="title">外部项目</span>
                <div class="main">
                  <div class="main-box">
                    <span>指导项目：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="myData.getUnapprovedCount==0?0:myData.guidanceExternalTypeCount/myData.getUnapprovedCount*100" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>{{myData.guidanceExternalTypeCount}}</span>
                  </div>
                  <div class="main-box">
                    <span>审核项目：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="myData.getUnapprovedExternalCount==0?0:myData.approvalExternalCount/myData.getUnapprovedExternalCount*100" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>{{myData.approvalExternalCount}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="piece">
            <h4>分享优秀项目方案（篇）</h4>
            <div class="down">
              <div class="down-box">
                <span class="title">方案分享</span>
                <div class="main">
                  <div class="main-box">
                    <span>方案共享：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="0" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>0</span>
                  </div>
                  <div class="main-box">
                    <span>方案收藏：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="0" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div class="down-box">
                <span class="title">资源贡献</span>
                <div class="main">
                  <div class="main-box">
                    <span>浏览：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="0" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>0</span>
                  </div>
                  <div class="main-box">
                    <span>下载：</span>
                    <span class="progress">
                      <el-progress :text-inside="false" :stroke-width="10" :percentage="0" :show-text="false" color="#23d05c"></el-progress>
                    </span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
// import _ from 'lodash'
import mixins from '@/mixins/mixins'
import projectManager from './projectManager'
import marketManager from './marketManager'
import { getMyPosition } from '@/api/gpms/index'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { projectManager, marketManager },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  data () {
    //参与项目个数
    this.colorsHistogram = [
      (paramsA) => {
        var colorList1 = ['#d66368', '#d97276', '#dd8184', '#da8a8d', '#e09c9e', '#e8adaf', '#f7c6c8', '#ffdfe0']
        return colorList1[paramsA.dataIndex]
      },
      (paramsB) => {
        var colorList2 = ['#f58f44', '#f79349', '#f79a55', '#f9a261', '#f7af78', '#f9b37f', '#fdc296', '#fdd1b0']
        return colorList2[paramsB.dataIndex]
      },
    ]
    this.chartSettingsHistogram = {
      metrics: ['总数', '外部项目'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },

    }
    this.chartExtendHistogram = {
      barWidth: '18',
      itemStyle: {
        barBorderRadius: 10,
      },
      series: {
        label: { show: true, position: 'top', color: '#333' },
      },
    }
    //参与项目合同总金额
    this.chartSettingsRing = {
      radius: [70, 100],
      level: [
        ['20万以下', '20万-50万', '50万以上'],
      ],
    }
    this.colorsRing = [
      (paramsA) => {
        var colorList1 = ['#90c0dc', '#b6cbc2', '#b4bbd7']
        return colorList1[paramsA.dataIndex]
      },
    ]



    return {
      myData: {
        getUnapprovedCount: 0,
        guidanceAllCount: 0,
        guidanceExternalAllCount: 0,
        getUnapprovedExternalCount: 0,
      },
      chartDataHistogram: {
        columns: ['dept', '总数', '外部项目'],
        rows: [
          { 'dept': '重要项目', '总数': 0, '外部项目': 0, 'prop': 'importantCount', 'Exter': 'importantExterCount' },
          { 'dept': '中级项目', '总数': 0, '外部项目': 0, 'prop': 'secondaryCount', 'Exter': 'secondaryExterCount' },
          { 'dept': '一般项目', '总数': 0, '外部项目': 0, 'prop': 'commonlyCount', 'Exter': 'commonlyExterCount' },
        ],
      },
      chartDataRing: {
        columns: ['类型', '数量'],
        rows: [
          { '类型': '50万以上', '数量': 0, 'prop': '50万以上' },
          { '类型': '20万-50万', '数量': 0, 'prop': '20万-50万' },
          { '类型': '20万以下', '数量': 0, 'prop': '20万以下' },
        ],
      },
      contractAmount: 'my',
      title: {
        text: '总金额',
        subtext: 0,
        textStyle: {
          color: '#dcdcdc',
          fontSize: 16,
          // align: 'center'
        },
        subtextStyle: {
          fontSize: 18,
          color: ['#333'],
        },
        x: 'center',
        y: 'center',
      },
      projectTagList: [],
      firtTag: '',
      secondTag: '',
    }
  },
  created () {
    this.getMyPosition()
  },
  methods: {
    handleClicks () {
      this.$router.push('/app/resource/project_list')
    },
    getMyPosition () {
      getMyPosition({ userId: this.userInfo.userId }).then(({ data }) => {
        this.myData = data.data
        this.title.subtext = Math.round(data.data.contarctCount / 10000)
        for (let item of this.chartDataHistogram.rows) {
          item['总数'] = data.data[item.prop]
          item['外部项目'] = data.data[item.Exter]
        }
        this.chartDataRing.rows.forEach(function (item) {
          if (data.data.contarctCountDetail) {
            item['数量'] = data.data.contarctCountDetail[item.prop]
          }
        })
        this.$refs['projectManager'].seriesGauge1.data[0].value = data.data.importantLevelCount
        this.$refs['projectManager'].seriesGauge2.data[0].value = data.data.secondaryLevelCount
        this.$refs['projectManager'].seriesGauge3.data[0].value = data.data.commonlyLevelCount
        this.$refs['projectManager'].seriesGauge4.data[0].value = data.data.externalCount

        this.$refs['projectManager'].seriesGauge1.axisLine.lineStyle.color[0][0] = data.data.importantLevelCount == 0 ? 0 : data.data.importantLevelCount / data.data.importantMaxCount
        this.$refs['projectManager'].seriesGauge2.axisLine.lineStyle.color[0][0] = data.data.secondaryLevelCount == 0 ? 0 : data.data.secondaryLevelCount / data.data.secondaryMaxCount
        this.$refs['projectManager'].seriesGauge3.axisLine.lineStyle.color[0][0] = data.data.commonlyLevelCount == 0 ? 0 : data.data.commonlyLevelCount / data.data.commonlyMaxCount
        this.$refs['projectManager'].seriesGauge4.axisLine.lineStyle.color[0][0] = data.data.externalCount == 0 ? 0 : data.data.externalCount / data.data.typeMaxCount
        this.$refs['marketManager'].seriesGauge1.data[0].value = data.data.importantMarketLevelCount
        this.$refs['marketManager'].seriesGauge2.data[0].value = data.data.secondaryMarketLevelCount
        this.$refs['marketManager'].seriesGauge3.data[0].value = data.data.commonlyMarketLevelCount
        this.$refs['marketManager'].seriesGauge4.data[0].value = data.data.marketExternalCount
        this.$refs['marketManager'].seriesGauge1.axisLine.lineStyle.color[0][0] = data.data.importantMarketLevelCount == 0 ? 0 : data.data.importantLevelCount / data.data.importantMarketMaxCount
        this.$refs['marketManager'].seriesGauge2.axisLine.lineStyle.color[0][0] = data.data.secondaryMarketLevelCount == 0 ? 0 : data.data.secondaryLevelCount / data.data.secondaryMarketMaxCount
        this.$refs['marketManager'].seriesGauge3.axisLine.lineStyle.color[0][0] = data.data.commonlyMarketLevelCount == 0 ? 0 : data.data.commonlyLevelCount / data.data.commonlyMarketMaxCount
        this.$refs['marketManager'].seriesGauge4.axisLine.lineStyle.color[0][0] = data.data.marketExternalCount == 0 ? 0 : data.data.externalCount / data.data.marketTypeMaxCount
        this.projectTagList = data.data.projectTagList
        // var count = 1
        // var yuansu = new Array() //存放数组array的不重复的元素 
        // var sum = new Array() //存放数组array中每个不同元素的出现的次数  
        // for (var i = 0; i < this.projectTagList.length; i++) {
        //   for (var j = i + 1; j < this.projectTagList.length; j++) {
        //     if (this.projectTagList[i] == this.projectTagList[j]) {
        //       count++ //用来计算与当前这个元素相同的个数  
        //       this.projectTagList.splice(j, 1) //每找到一个相同的元素，就要把它移除掉，  
        //       j--
        //     }
        //   }
        //   // console.log(this.projectTagList[i])
        //   // console.log(count)
        //   yuansu[i] = this.projectTagList[i] //将当前的元素存入到yuansu数组中  
        //   sum[i] = count //并且将有多少个当前这样的元素的个数存入sum数组中  
        //   count = 1 //再将count重新赋值，进入下一个元素的判断  
        // }

        // //算出array数组中出现次数最多的元素  
        // var newsum = new Array() //  sum;  
        // for (var item in sum) {
        //   newsum[item] = sum[item]
        // }
        // newsum.sort()
        // var maxItem = 0
        // var twoItem = 0
        // for (var item1 in sum) {
        //   if (sum[item1] == newsum[newsum.length - 1]) {
        //     maxItem = item1
        //   }
        //   else if (sum[item1] == newsum[newsum.length - 2]) {
        //     twoItem = item1
        //   }
        // }
        // this.firtTag = yuansu[maxItem]
        // this.secondTag = yuansu[twoItem]
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.grid-content {
  font-size: 16px;
}
.counter-box {
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    .say {
      font-size: 14px;
      color: #666;
      i {
        margin-right: 5px;
      }
    }
  }
  .counter-chart {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    .piece {
      border: 1px solid #eee;
      padding: 15px;
      > h4 {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
      }
      .down {
        display: flex;
        .down-box {
          width: 50%;
          .title {
            width: 100%;
            background-color: #fafafa;
            text-align: center;
            display: block;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
          }
          .main {
            width: 100%;
            .main-box {
              text-align: left;
              margin: 20px 0 20px 30px;
              .progress {
                width: 40%;
                margin: 0 5px;
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
}
.el-col {
  border: 1px solid #eee;
  padding: 15px;
}
// .el-col:nth-child(odd) {
//   margin-right: 10px;
// }
</style>


