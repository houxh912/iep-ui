<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">签单金额</span>
      <div class="search">
        <div class="inline margin">
          <el-radio-group v-model="type" size="mini" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inline">
          <operation-search @search="searchPage" advance-search>
          </operation-search>
        </div>
      </div>
    </div>
    <div>
      <div class="money">签单金额：8000000</div>
      <el-row>
        <div id="moneyColumn">
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('moneyColumn'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        legend: {
          data: ['客户'],
          bottom: 0,
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '10%',
          top: '3%',
          containLabel: true,
        },
        series: [
          {
            name: '客户',
            data: [10, 8, 0, 8, 2, 0, 0],
            type: 'line',
            itemStyle: {
              color: '#D56368',
            },
          },
        ],
      })
    },
    searchPage () {
      this.$message.success('功能开发中')
    },
    changeType () {
      this.$message.success('功能开发中')

    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  font-size: 18px;
  padding-right: 10px;
}
.search {
  float: right;
  .margin {
    margin-right: 10px;
  }
  .inline {
    display: inline-block;
  }
}
#moneyColumn {
  width: "auto";
  height: 300px;
}
.money {
  padding-left: 50px;
}
</style>
