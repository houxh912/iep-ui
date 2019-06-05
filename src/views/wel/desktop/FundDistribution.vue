<template>
  <div class="fund">
    <div class="content">
      <el-card shadow="never">
        <operation-container>
          <template slot="left">
            <span class="sub-title">内网资金分布情况</span>
          </template>
          <template slot="right">
            <div class="time">
              <div class="time-text">
                <span>昨日</span>
                <span>今日</span>
                <span>本周</span>
                <span>本月</span>
                <span class="active">全年</span>
              </div>
              <div class="block">
                <el-date-picker v-model="dateValue" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </template>
        </operation-container>
        <iep-divider />
        <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="colors" height="280px" :tooltip-visible="false" :legend-visible="false"></ve-histogram>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    this.colors = [
      (paramsA) => {
        var colorList1 = ['#d66368', '#d97276', '#dd8184', '#da8a8d', '#e09c9e', '#e8adaf', '#f7c6c8', '#ffdfe0']
        return colorList1[paramsA.dataIndex]
      },
    ]
    this.chartSettings = {
      metrics: ['分布'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },

    }
    this.chartExtend = {
      barWidth: '26',
      itemStyle: {
        barBorderRadius: 13,
      },

    }
    return {
      dateValue: '',
      chartData: {
        columns: ['dept', '分布'],
        rows: [
          { 'dept': '在职员工', '分布': 38 },
          { 'dept': '部门', '分布': 52 },
          { 'dept': '离职员工', '分布': 61 },
          { 'dept': '员工提现', '分布': 145 },
          { 'dept': '系统回收', '分布': 48 },
          { 'dept': '内网往来账', '分布': 38 },
          { 'dept': '集团账户余额', '分布': 38 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.fund {
  .sub-title {
    font-size: 16px;
  }
}
</style>
<style scoped>
.fund >>> .time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
}
.fund >>> .time-text {
  display: flex;
  margin-right: 10px;
  justify-content: space-between;
  align-items: center;
  width: 200px;
}
.fund >>> .block {
  width: 200px;
}
.fund >>> .el-date-editor.el-input__inner {
  width: 100%;
}
.fund >>> .el-card__body {
  height: 100%;
}
</style>

