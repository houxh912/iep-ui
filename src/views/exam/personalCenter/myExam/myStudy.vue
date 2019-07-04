<template>
  <el-card class="myStudy-box" shadow="never">
    <div slot="header">
      <span>我的学习</span>
    </div>
    <el-row>
      <el-col :span="12" class="tab">
        <div class="lately">
          <h5>最佳考试成绩</h5>
          <el-row>
            <el-col :span="8">新员工入职考试</el-col>
            <el-col :span="8"><strong>98</strong><span> 分</span></el-col>
            <el-col :span="8">2018/12/05</el-col>
          </el-row>
        </div>
        <div class="usually">
          <h5>经常参加的考试</h5>
          <div class="usuallyExam">
            <el-tag type="info" color="#fff" size="medium" v-for="item in exams" :key="item.value">
              {{item.label}}
              <span>{{item.score}}</span>
            </el-tag>
          </div>
        </div>
        <div class="joinExam">
          <iep-button type="primary" icon="el-icon-edit">我要考试</iep-button>
        </div>
      </el-col>

      <el-col :span="12" class="tab" style="padding-left:4%">
        <div class="lately">
          <h5>最佳练习成绩</h5>
          <el-row>
            <el-col :span="8">新员工入职考试</el-col>
            <el-col :span="8"><strong>98</strong><span> 分</span></el-col>
            <el-col :span="8">2018/12/05</el-col>
          </el-row>
        </div>
        <div class="usually">
          <h5>经常参加的练习</h5>
          <div class="usuallyExam">
            <el-tag type="info" color="#fff" size="medium" v-for="item in practices" :key="item.value">
              {{item.label}}
              <span>{{item.score}}</span>
            </el-tag>
          </div>
        </div>
        <div class="joinExam">
          <iep-button type="primary" icon="el-icon-edit">我要练习</iep-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      exams: [
        { value: 0, label: '数据基因', score: '23' },
        { value: 1, label: '大数据', score: '23' },
        { value: 2, label: '国脉内网', score: '23' },
      ],
      practices: [
        { value: 0, label: '数据基因', score: '23' },
        { value: 1, label: '大数据', score: '23' },
        { value: 2, label: '国脉内网', score: '23' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.myStudy-box {
  .lately {
    padding: 0 25px;
    .el-col {
      color: rgb(136, 136, 136);
    }
    .el-col:nth-child(2) {
      text-align: center;
    }
    .el-col:last-child {
      text-align: center;
    }
  }
  .tab {
    > div:nth-child(2) {
      margin-top: 16px;
    }
    > div:last-child {
      margin-top: 35px;
    }
    border-right: 1px solid #ddd;
    font-size: 14px;
    color: #666;
    padding: 10px;
    &:last-child {
      border-right: 0;
    }
    .usually {
      padding: 0 25px;
      .usuallyExam {
        .el-tag {
          margin-right: 20px;
        }
      }
    }
    .joinExam {
      text-align: center;
    }
  }
}
</style>
<style scoped>

</style>