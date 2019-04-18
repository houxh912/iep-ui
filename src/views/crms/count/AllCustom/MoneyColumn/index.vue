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
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </div>
      </div>
    </div>
    <div>
      <div class="money">签单金额：8000000</div>
      <el-row>
        <ve-line :data="chartData" :extend="chartExtend" height="300px" :loading="loading"></ve-line>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import 'v-charts/lib/style.css'
import AdvanceSearch from './AdvanceSearch'
export default {
  components: { AdvanceSearch },
  data () {
    this.chartExtend = {
      legend: {
        show: 'true',
        data: ['金额'],
        bottom: 0,
      },
      xAxis: {
        min: '周一',
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },

      },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '40',
        top: '5%',
        containLabel: true,
      },
      series: {
        name: '金额',
        type: 'line',
        smooth: false,
        lineStyle: {
          color: '#D56368',
        },

      },
    }
    return {
      loading: false,
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '周一', '访问用户': 90000 },
          { '日期': '周二', '访问用户': 35000 },
          { '日期': '周三', '访问用户': 65000 },
          { '日期': '周四', '访问用户': 30000 },
          { '日期': '周五', '访问用户': 21000 },
          { '日期': '周六', '访问用户': 0 },
          { '日期': '周日', '访问用户': 56312 },
        ],
      },
    }
  },
  methods: {
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
  padding: 10px 0 10px 55px;
}
</style>
