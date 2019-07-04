<template>
  <el-card class="myPractice-box" shadow="never">
    <div slot="header" class="clearfix">
      <span>我的练习记录</span>
      <div style="float:right">
        <span>
            <span class="topTxt">今天练习 <strong class="numTxt">{{ toady }}</strong> 道</span>
            <span class="topTxt">总练习 <strong class="numTxt">{{ total }}</strong> 道</span>
        </span>
      </div>
    </div>
    <el-row>
      <el-col :span="12" class="tab" style="position:relative;">
        <div class="lately">
          <h5>每天练习记录</h5>
        </div>
        <ve-ring class="echarts" :data="chartData" :settings="chartSettings" height="270px" :extend="chartExtend"></ve-ring>
        <div class="leftTxt">
          <p>{{ eachDayTotal }}</p>
          <span>今天完成量</span>
        </div>
      </el-col>

      <el-col :span="12" class="tab" style="padding-left:4%">
        <div class="lately">
          <h5>全部练习记录</h5>
        </div>
        <div class="tableList">
          <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, prev, pager, next">
            <el-table-column prop="subject" label="日期" min-width="58">
              <template slot-scope="scope">
                {{scope.row.subject}}
              </template>
            </el-table-column>
            <el-table-column prop="title" label="做题数">
              <template slot-scope="scope">
                {{scope.row.title}}
              </template>
            </el-table-column>
            <el-table-column prop="levelName" label="完成率" min-width="50">
              <template slot-scope="scope">
                {{scope.row.levelName}}
              </template>
            </el-table-column>
          </iep-table>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getCertificatePage } from '@/api/exam/review'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    this.chartSettings = {
      radius: ['50%', '70%'],
    },
    this.chartExtend = {
      series: {
        center: ['50%', '50%'],
      },
      color: ['#D56268', '#E8A7AA'],
      legend: {
        orient: 'vertical',
        left: 0,
        aligin: 'auto',
      },
      label: {
        show: false,
      },
    }
    return {
        toady: 23,
        total: 123,
        chartData: {
        columns: ['name', 'value'],
        rows: [
          { 'name': '今日做题数', 'value': 1393 },
          { 'name': '剩余题数', 'value': 1393 },
        ],
      },
    }
  },
  computed: {
    eachDayTotal: function () {
      return Number(this.chartData.rows[0].value / (this.chartData.rows[0].value + this.chartData.rows[1].value) * 100) + ' %'
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取我的练习记录数据
     */
    loadPage () {
      this.pageOption.size = 4
      this.loadTable( {...this.pageOption}, getCertificatePage)
    },
  },
}
</script>

<style lang="scss" scoped>
.topTxt {
    margin-left: 20px;
    .numTxt {
        color: #cb3737;
    }
}
.myPractice-box {
  .lately {
    padding: 0 25px;
    .el-col:nth-child(2) {
      text-align: center;
    }
    .el-col:last-child {
      text-align: center;
    }
  }
  .tab {
    border-left: 1px solid #ddd;
    font-size: 14px;
    color: #666;
    padding: 10px;
    &:first-child {
      border-left: 0;
    }
  }
  .echarts {
    padding: 13px 21px 0 21px;
  }
  .tableList {
    padding: 13px 25px 0 25px;
  }
  .leftTxt {
    position: absolute;
    text-align: center;
    top: 56%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 0 25px;
    p {
      font-size: 22px;
      color: #cb3737;
      margin: 0;
      font-weight: 500;
    }
  }
}
</style>