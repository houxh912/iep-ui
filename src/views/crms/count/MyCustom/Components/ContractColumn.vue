<template>
  <el-card shadow="hover">
    <el-row class="contract">
      <el-col class="head">合同概况<span class="sub">（本月已签订合同金额共￥260,000）</span>
        <span class="dropdown">
          <el-select v-model="value" @change="change()">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
      </el-col>
    </el-row>
    <div class="echarts over">
      <div id="contract" :style="{width: '100%', height: '300px'}"></div>
    </div>
  </el-card>
</template>
<script>
// import { getMyDistrict } from '@/api/crms/count'
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
    }
  },
  created () {
    // this.load()
  },
  mounted () {
    this.draw()
  },
  methods: {
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
          bottom: '0',
          top: '10',
          borderColor: '#f00',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['01.02', '01.03', '01.04', '01.05', '01.06', '01.07', '01.07', '01.07', '01.07', '01.07', '01.07', '01.07', '01.07'],
            axisTick: {
              alignWithLabel: true,
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
            data: [10000, 32050, 20400, 33424, 39420, 35330, 45620, 45620, 45620, 45620, 45620, 45620, 45620, 45620, 45620, 45620],
            itemStyle: {
              color: '#D56368',
              barBorderRadius: 10,
            },
            label: {
              show: true,
              position: ['-50%', -20],
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

      this.$message.success('功能开发中')
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
  height: 300px;
  width: 100%;
  padding: 10px 0;
  margin-top: 20px;
}
.over {
  width: 100%;
  overflow: x;
}
.dropdown {
  float: right;
}
.el-select {
  width: 120px !important;
}
</style>
<style>
.el-card >>> .el-card__body {
  overflow: auto;
}
</style>

