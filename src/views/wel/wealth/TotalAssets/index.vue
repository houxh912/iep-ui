<template>
  <div>
    <basic-container>
      <div class="main-top">
        <el-card class="left" shadow="hover">
          <h4 class="title">总资产</h4>
          <ul>
            <li>
              <span class="num">6233.5</span>
              <span class="sub-title">账户余额</span>
            </li>
            <li>
              <span class="num">8000</span>
              <span class="sub-title">发票额度</span>
            </li>
            <li>
              <span class="num">2000</span>
              <span class="sub-title">冻结金额</span>
            </li>
            <li>
              <span class="num">3000</span>
              <span class="sub-title">已提现</span>
            </li>
            <li>
              <span class="num">6233.5</span>
              <span class="sub-title">今日国脉贝</span>
            </li>
          </ul>
        </el-card>
        <el-card class="right" shadow="hover">
          <h4 class="title">快捷入口</h4>
          <ul>
            <li>互助基金</li>
            <li>发票提交</li>
            <li>开票通知</li>
            <li>我要提现</li>
            <li>我要打赏</li>
            <li>我要投资</li>
          </ul>
        </el-card>
      </div>
      <div class="content">
        <el-card class="box-card" shadow="hover">
          <operation-container>
            <template slot="left">
              <page-header title="财富统计-类型" :replaceText="replaceText" :data="[10 ,5]"></page-header>
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
                  <el-date-picker v-model="value6" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
            </template>
          </operation-container>
          <a-divider />
          <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="colors"></ve-histogram>
        </el-card>
      </div>
    </basic-container>
  </div>
</template>
<script>

export default {
  data () {
    this.colors = [
      (paramsA) => {
        var colorList1 = ['#d66368', '#d97276', '#dd8184', '#e7a6aa', '#e6a1a4','#e9b1b2','#e9b1b2','#edc2c3','#f2d0d1']
        return colorList1[paramsA.dataIndex] 
      },
      (paramsB) => {
        var colorList2 = ['#f58f44', '#f79349', '#f79a55', '#f9a261', '#f5a76c','#f7af78','#f5b380','#f5b88a','#f5bd93']
        return colorList2[paramsB.dataIndex] 
      },
    ]
    this.chartSettings = {
      metrics: ['收入', '支出'],
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
      replaceText: (data) => `（收入共计${data[0]}笔，共计${data[0]}贝）`,
      value6: '',
      chartData: {
        columns: ['dept', '收入', '支出'],
        rows: [
          { 'dept': '内网', '收入': 38, '支出':22 },
          { 'dept': '部门', '收入': 52, '支出':22 },
          { 'dept': '提现', '收入': 61, '支出':22 },
          { 'dept': '批评', '收入': 145, '支出':22 },
          { 'dept': '学习', '收入': 48, '支出':22 },
          { 'dept': '打赏', '收入': 38, '支出':22 },
          { 'dept': '离职', '收入': 38, '支出':22 },
          { 'dept': '其他', '收入': 38, '支出':22 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main-top,
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-top {
  .title {
    margin: 0;
    font-size: 20px;
  }
  .left {
    flex: 1;
    margin-right: 20px;
    li {
      padding: 12px 40px;
      border-right: 1px solid #ebeef5;
      &:last-child {
        border: 0;
      }
    }
  }
  .right {
    flex: 0 0 300px;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      li {
        cursor: pointer;
        padding: 10px 15px;
        cursor: pointer;
        &:hover {
          color: #cb3737;
        }
      }
    }
  }
  ul {
    span {
      display: block;
      text-align: center;
    }
    .num {
      font-size: 24px;
    }
    .sub-title {
      color: #999;
    }
  }
}
.content {
  margin-top: 20px;
}
</style>

<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .time-text {
    span {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    span.active {
      color: #cb3737;
    }
  }
  .block {
    width: 40%;
  }
}
</style>
