<template>
  <el-card shadow="hover">
    <el-row class="contract">
      <el-col class="head">合同概况<span class="sub">（本月已签订合同金额共￥{{getData.totalMoney}}）</span>
        <span class="dropdown">
          <el-select v-model="value" @change="change()">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
      </el-col>
    </el-row>
    <div class="echarts over">
      <div id="contract" :style="{width: width, height: '320px'}"></div>
    </div>
  </el-card>
</template>
<script>
import { getMySituation } from '@/api/crms/count'
import _ from 'lodash'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/grid')
export default {
  data () {
    return {
      value: 1,
      options: [
        {
          label: '本月', value: 1,
        },
        {
          label: '上月', value: 2,
        },
        {
          label: '本季度', value: 3,
        },
        {
          label: '上季度', value: 4,
        },
        {
          label: '今年', value: 5,
        },
        {
          label: '去年', value: 6,
        },
      ],
      interval: '1',
      width: '100%',
      getData: {
        totalMoney: '',
        xList: [],
        mainList: [],
      },
    }
  },
  created () {
    this.load()

  },
  mounted () {
    this.draw()
  },
  methods: {
    load () {
      getMySituation({ interval: this.interval }).then((res) => {
        this.getData.totalMoney = res.data.data.contractAmount.toLocaleString()
        this.getData.xList = _.map(res.data.data.contractSituations, 'timeInterval')
        this.getData.mainList = _.map(res.data.data.contractSituations, 'contractAmount')
        if (this.interval == 1 || this.interval == 2) {
          for (var item in this.getData.xList) {
            this.getData.xList[item] = this.getData.xList[item].substr(5, 2) + '.' + this.getData.xList[item].substr(7, 2)
          }
        } else {
          for (var index in this.getData.xList) {
            this.getData.xList[index] = this.getData.xList[index].substr(6, 1) + ' 月'
          }
        }
        if (12 < this.getData.mainList.length < 20) {
          this.width = '600px'
        } else if (20 <= this.getData.mainList.length) {
          this.width = '900px'
        }
        this.draw()
      })
    },
    draw () {
      let myChart = echarts.init(document.getElementById('contract'))
      myChart.setOption({
        title: {
          show: false,
        },
        color: '#87888B',
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '50',
          top: '40',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.getData.xList,
            axisTick: {
              alignWithLabel: true,
            },
            splitArea: {
              interval: 10,
            },
          },
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            onZero: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
            },
          },
        },
        series: [
          {
            name: '金额',
            type: 'bar',
            barWidth: '15',
            data: this.getData.mainList,
            itemStyle: {
              color: '#D56368',
              barBorderRadius: 10,
            },
            label: {
              show: true,
              position: [-20, -20],
              color: '#000',
              formatter: function (params) {
                if (params.value) {
                  return '￥ ' + params.value.toLocaleString()
                } else {
                  return ''
                }
              },
            },
          },
        ],
      })
    },
    change () {
      this.interval = this.value
      this.load()
    },

  },
}
</script>
<style lang="scss" scoped>
.contract {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .sub {
      font-weight: 500;
      font-size: 14px;
      color: #666;
    }
  }
  .btn {
    text-align: right;
  }
}
.echarts {
  height: 320px;
  padding-top: 20px;
}
.over {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.over::-webkit-scrollbar {
  height: 10px;
}
.over::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.over::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: transparent;
}
.dropdown {
  float: right;
}
.el-select {
  width: 120px !important;
}
</style>

