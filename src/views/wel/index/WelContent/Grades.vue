<template>
  <div class="Grades">
    <div class="Grades-nav">
      <div>我的成績</div>
    </div>
    <div class="Grades-content">
      <el-row v-for="(item,index) in dataList" :key="index">
        <el-col :span="10">
          <div class="grid-content bg-purple title">{{item.title}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.score}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.situation}}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple text-right text-time">{{item.date}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { title: '2019内网职称一季度考试', score: '68分', situation: '超越了10%的人', date: '02-19' },
        { title: '2019第三季度国脉职称考试', score: '73分', situation: '超越了70%的人', date: '10-09' },
        { title: '2019第三季度国脉职称考试', score: '73分', situation: '超越了70%的人', date: '10-09' },
        { title: '2019第三季度国脉职称考试', score: '73分', situation: '超越了70%的人', date: '10-09' },
        { title: '2019第三季度国脉职称考试', score: '73分', situation: '超越了70%的人', date: '10-09' },
      ],
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.Grades {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  color: #5f5f5f;
  .Grades-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .Grades-content {
    padding: 10px 0;
    font-size: 14px;
    .text-right {
      text-align: right;
    }
    .text-time {
      color: #999;
    }
  }
  .title {
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
