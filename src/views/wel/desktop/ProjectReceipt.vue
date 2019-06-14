<template>
  <div class="fund">
    <div class="content">
      <el-card shadow="never">
        <operation-container>
          <template slot="left">
            <span class="sub-title">项目签收</span>
          </template>
          <template slot="right">
            <el-button-group class="time">
              <el-button>月</el-button>
              <el-button class="active">年</el-button>
            </el-button-group>
          </template>
        </operation-container>
        <iep-divider />
        <div class="chart">
          <ve-line :data="chartData" :settings="chartSettings" :colors="colors" width="400"></ve-line>
          <fraction></fraction>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Fraction from './Fraction'
export default {
  components: { Fraction },
  data () {
    this.colors = ['#d66368', '#f58f44']
    this.chartSettings = {
      yAxisName: ['  单位(百万元)'],
    }
    return {
      chartData: {
        columns: ['日期', '合同金额', '收款金额'],
        rows: [
          { '日期': '1月', '合同金额': 3, '收款金额': 1 },
          { '日期': '2月', '合同金额': 3, '收款金额': 3 },
          { '日期': '3月', '合同金额': 2, '收款金额': 3 },
          { '日期': '4月', '合同金额': 4, '收款金额': 2 },
          { '日期': '5月', '合同金额': 2, '收款金额': 7 },
          { '日期': '6月', '合同金额': 5, '收款金额': 6 },
          { '日期': '7月', '合同金额': 4, '收款金额': 7 },
          { '日期': '8月', '合同金额': 4, '收款金额': 6 },
          { '日期': '9月', '合同金额': 6, '收款金额': 7 },
          { '日期': '10月', '合同金额': 10, '收款金额': 8 },
          { '日期': '11月', '合同金额': 9, '收款金额': 7 },
          { '日期': '12月', '合同金额': 11, '收款金额': 9 },
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
  .chart {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
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
.fund >>> .time .el-button {
  padding: 5px 20px;
}
.fund >>> .time .el-button.active,
.fund >>> .time .el-button:focus {
  border-color: #cb3737;
  color: #cb3737;
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

