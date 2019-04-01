<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">出单分析</span>
      <operation-search @search="searchPage" advance-search class="search">
      </operation-search>
    </div>
    <div>
      <el-row>
        <div class="echarts">
          <el-row>
            <el-col :span=10>
              <div class="echarts odd">
                <v-chart :forceFit="true" height="300" :data="data" :scale="scale" :padding="[40,20,40,60]">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item" />
                  <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
                  <v-coord type="theta" />
                </v-chart>
              </div>
            </el-col>
            <el-col :span=9>
              <div class="echarts">
                <v-chart :forceFit="true" height="300" :data="data1" :scale="scale1" :padding="[40,20,40,60]">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <v-legend dataKey="item" />
                  <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
                  <v-coord type="theta" />
                </v-chart>
              </div>
            </el-col>
            <el-col :span=5>
              <div class="echarts lines">
                <div class="line"></div>
                <div class="percent">
                  <el-progress type="circle" :percentage="percent" color="#D56368" :stroke-width="10" status="text">
                    {{percent+'%'}} <br>
                    出单率
                  </el-progress>
                </div>
                <div class="msg">省级客户，业务咨询类客户居多出单了70%</div>
                <div class="suggest">建议多寻找省级客户，建议多寻找省级客户，建议多寻找省级客户，建议多寻找省级客户。</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { data, scale } from './chart1'
import { data1, scale1 } from './chart2'
export default {
  data () {
    return {
      data,
      scale,
      data1,
      scale1,
      height: 400,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      percent: 70,
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        },
      }],
    }
  },
  methods: {
    searchPage () {

    },
  },
}
</script>

<style lang="scss" scoped>
.clearfix {
  .title {
    font-weight: 700;
    font-size: 18px;
    padding-right: 10px;
  }
}
.search {
  float: right;
}
.echarts {
  height: 300px;
  padding: 15px 10px;
  position: relative;
  .percent {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 15px;
  }
}
.lines {
  padding-left: 20px;
  .line {
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: #eee;
  }
}
</style>
