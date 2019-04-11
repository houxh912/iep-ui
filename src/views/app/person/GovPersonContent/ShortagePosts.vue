<template>
  <div class="leaderBoard">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle">{{title}}</span>
        <div class="important">
          <el-button type="text">争做伯乐</el-button>
          <el-button type="text">申请转岗</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="岗位名称" width="180">
        </el-table-column>
        <el-table-column prop="num" label="需求数" width="180">
        </el-table-column>
        <el-table-column prop="education" label="学历要求">
        </el-table-column>
        <el-table-column prop="salary" label="薪资待遇">
        </el-table-column>
        <el-table-column prop="demandDepartment" label="需求部门">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '紧缺岗位',
      tableData: [
        {
          name: 'java工程师',
          num: '3',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '产品经理',
          num: '5',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '算法工程师',
          num: '2',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '高级咨询师',
          num: '2',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
        {
          name: '前段开发工程师',
          num: '4',
          education: '大专',
          salary: '面议',
          demandDepartment: '国脉集体研发中心',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
<style scoped>
.important >>> .el-button--text {
  padding: 0;
}
.important >>> .el-button--text:hover {
  color: #f56c6c;
}
.leaderBoard >>> .el-table th {
  background-color: #fafafa;
}
.leaderBoard >>> .el-table tr {
  cursor: pointer;
}
.leaderBoard >>> .el-card__body {
  height: 343px;
}
</style>
