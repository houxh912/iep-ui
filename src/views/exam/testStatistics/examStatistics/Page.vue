<template>
  <div>
    <basic-container>
      <iep-page-header :title="form.title" :backOption="backOption"></iep-page-header>
      <div>
        <hr>
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-row class="item">
          <el-col :span="6">
            <el-form-item label="开考时间：">
              <el-input v-model="form.beginTime" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间：">
              <el-input v-model="form.endTime" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="6">
            <el-form-item label="考试类型：">
              <el-input v-model="form.examType" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报名人数：">
              <el-input v-model="form.totalEnrollment" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实考人数：">
              <el-input v-model="form.totalExam" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="及格人数：">
              <el-input v-model="form.isPassTotal" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="6">
            <el-form-item label="最高分：">
              <el-input v-model="form.maxPenScore" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最低分：">
              <el-input v-model="form.minPenScore" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平均分：">
              <el-input v-model="form.avgPenScore" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="及格率：">
              <el-input v-model="form.passRateView" size="mini" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

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
      form: {
        examType: '',
      },
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
      this.form = row
      this.form.examType = row.examType == 0 ? '考试模式' : '练习模式'
      this.form.endTime = row.endTime == '2049-09-24 12:00:00' ? '长期有效' : row.endTime
    },
  },
}
</script>

<style lang="scss" scoped>
hr {
  margin-top: -8px;
  background-color: #d7d7d7;
  border: none;
  height: 1px;
}
.el-form-item {
  margin-bottom: 5px;
}
</style>
<style  scoped>
.tab >>> .el-tabs__header {
  margin: 0px 0 10px;
}
</style>