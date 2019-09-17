<template>
  <div>
    <basic-container>
      <iep-page-header :title="topTitle" :backOption="backOption"></iep-page-header>

      <div class="top">
        <div class="time-box">
          <el-row>
            <el-col :span="8">
              <el-col :span="5">
                <div class="des">考试时间 :</div>
              </el-col>
              <el-col :span="19">
                <div class="time">{{row.beginTime}} ~ {{row.endTime}}</div>
              </el-col>
            </el-col>
            <el-col :span="16"></el-col>
          </el-row>
        </div>
        <div class="box-list">
          <div class="box" v-for="(item, index) in dataList" :key="index">
            <el-col :span="12" class="name-box">
              <div class="name">{{item.title}}</div>
            </el-col>
            <el-col :span="12">
              <div class="num">{{item.count}}</div>
            </el-col>
          </div>
        </div>
      </div>

      <iep-tabs v-model="activeTab" :tab-list="tabList" class="tab">
        <template v-if="activeTab ==='GradeAnalyze'" v-slot:GradeAnalyze>
          <grade-analyze :recordData="recordData"></grade-analyze>
        </template>
        <template v-if="activeTab ==='ScoreStatistics'" v-slot:ScoreStatistics>
          <score-statistics :recordData="recordData"></score-statistics>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import GradeAnalyze from './gradeAnalyze/index.vue'
import ScoreStatistics from './scoreStatistics/'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { GradeAnalyze, ScoreStatistics },
  data () {
    return {
      tabName: 'examTabSS',
      tabList: [{
        label: '成绩分析',
        value: 'GradeAnalyze',
      }, {
        label: '分数段统计',
        value: 'ScoreStatistics',
      }],
      activeTab: 'GradeAnalyze',
      topTitle: null,
      row: {},
      dataList: [
        { title: '考试类型 :', count: '' },
        { title: '及格率 :', count: '' },
        { title: '平均分 :', count: 0 },
        { title: '最高分 :', count: 0 },
        { title: '最低分 :', count: 0 },
        { title: '报名人数 :', count: 0 },
        { title: '实考人数 :', count: 0 },
        { title: '及格人数 :', count: 0 },
      ],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('onGoBack', {
            current: this.record.current,
            size: this.record.size,
            search: this.record.search,
          })
        },
      },
      recordData: {},
    }
  },
  created () {
    this.recordData = this.record
    this.loadPage()
  },
  methods: {
    loadPage () {
      const { row } = this.record
      this.row = row
      this.topTitle = this.row.title
      this.row.beginTime = this.row.beginTime
      this.row.endTime = this.row.endTime
      this.dataList[0].count = this.row.examType == 0 ? '考试模式' : '练习模式'
      this.dataList[1].count = this.row.passRateView
      this.dataList[2].count = this.row.avgPenScore
      this.dataList[3].count = this.row.maxPenScore
      this.dataList[4].count = this.row.minPenScore
      this.dataList[5].count = this.row.totalEnrollment
      this.dataList[6].count = this.row.totalExam
      this.dataList[7].count = this.row.isPassTotal
    },
  },
}
</script>

<style lang="scss" scoped>
.top {
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  background-color: #fafafa;
  margin-top: -13px;
  .time-box {
    height: 29px;
    line-height: 28px;
    font-size: 14px;
    .des {
      color: #333;
      float: right;
      margin-right: 8px;
    }
    .time {
      color: #797b79;
    }
  }
  .box-list {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(1, 1fr);
    .box {
      height: 29px;
      line-height: 28px;
      font-size: 14px;
      .name-box {
        text-align: right;
        .title {
          color: #333;
        }
      }
      .num {
        color: #797b79;
        margin-left: 5px;
      }
    }
  }
}
</style>
<style  scoped>
.tab >>> .el-tabs__header {
  margin: 0px 0 10px;
}
</style>