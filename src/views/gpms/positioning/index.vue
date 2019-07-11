<template>
  <div>
    <basic-container>
      <iep-page-header title="我的定位">
        <template>
          <el-button class="modify" size="small" @click="handleClicks">项目PK</el-button>
        </template>
      </iep-page-header>
      <div class="title-box">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <p style="color:#666;">您的个人项目(参与度)指数为
                <span style="font-size:24px;color:#ba1a22;">174</span>
                ！您是一个
                <span style="color:#000;">优秀</span>
                的
                <span style="color:#000;">项目经理</span>
                ，尤其擅长
                <span style="color:#000;">营商环境</span>
                、
                <span style="color:#000;">数据基因</span>
                主题的项目。</p>
              <p style="color:#666;">请继续努力，发挥自身价值，成为更优秀的国脉人!</p>
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
                参与项目总数（个）：<br />
                项目合同总金额（万元）:<br />
                担任项目经理次数（次）：<br />
                担任项目成员次数（次）：<br />
                分享项目材料总数（个）：<br />
                平均水平：国脉人的平均数据<br />
                同期水平：与当前用户入司时间相近的国脉人的平均数据
              </div>
              <i class='iconfont icon-zhuyi'>分布说明</i>
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
            <el-tabs v-model="contractAmount" @tab-click="contractClick">
              <el-tab-pane label="我的" name="my"></el-tab-pane>
              <el-tab-pane label="总数" name="all"></el-tab-pane>
            </el-tabs>
            <ve-ring :data="chartDataRing" :settings="chartSettingsRing" :colors="colorsRing">
            </ve-ring>
          </div>
          <div class="piece">
            <h4>担任项目经理或负责项目次数（次）</h4>
            <project-manager></project-manager>
          </div>
          <div class="piece">
            <h4>担任市场经理次数（次）</h4>
            <market-manager></market-manager>
          </div>
          <div class="piece">
            <h4>担任项目督导指导项目次数（次）</h4>
            <div class="down">
              <div class="down-box">
                <span class="title">总数</span>
                <div class="main">
                  <div class="main-box">
                    <span>指导项目：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
                  </div>
                  <div class="main-box">
                    <span>指导项目：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
                  </div>
                </div>
              </div>
              <div class="down-box">
                <span class="title">外部项目</span>
                <div class="main">
                  <div class="main-box">
                    <span>指导项目：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
                  </div>
                  <div class="main-box">
                    <span>指导项目：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
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
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
                  </div>
                  <div class="main-box">
                    <span>方案收藏：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
                  </div>
                </div>
              </div>
              <div class="down-box">
                <span class="title">资源贡献</span>
                <div class="main">
                  <div class="main-box">
                    <span>浏览：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
                  </div>
                  <div class="main-box">
                    <span>下载：</span>
                    <el-progress width="40%" :text-inside="false" :stroke-width="10" :percentage="80" :show-text="false" color="#23d05c"></el-progress>
                    <span>22</span>
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

import mixins from '@/mixins/mixins'
import projectManager from './projectManager'
import marketManager from './marketManager'
export default {
  mixins: [mixins],
  components: { projectManager, marketManager },
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
      level: [
        ['50万以下项目', '50-100万以下项目', '100-150万以下项目'],
      ],
    }
    this.colorsRing = [
      (paramsA) => {
        var colorList1 = ['#90c0dc', '#b6cbc2', '#b4bbd7']
        return colorList1[paramsA.dataIndex]
      },
    ]



    return {
      chartDataHistogram: {
        columns: ['dept', '总数', '外部项目'],
        rows: [
          { 'dept': '重要项目', '总数': 100, '外部项目': 122 },
          { 'dept': '中级项目', '总数': 100, '外部项目': 160 },
          { 'dept': '一般项目', '总数': 100, '外部项目': 180 },
        ],
      },
      chartDataRing: {
        columns: ['类型', '数量'],
        rows: [
          { '类型': '50万以下项目', '数量': 13 },
          { '类型': '50-100万以下项目', '数量': 35 },
          { '类型': '100-150万以下项目', '数量': 29 },
        ],
      },
      contractAmount: 'my',
    }
  },
  methods: {
    handleClicks () {

    },
    contractClick (tab, event) {
      console.log(tab, event)
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
              text-align: center;
              margin: 20px 0;
              .el-progress {
                display: inline-block;
                margin: 0 5px;
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


