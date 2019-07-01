<template>
  <div class="mission">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="date" label="时间">
      </el-table-column>
      <el-table-column prop="tasks" label="任务数">
      </el-table-column>
      <el-table-column prop="num" label="人数">
      </el-table-column>
      <el-table-column prop="finish" label="完成数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '任务概况',
      tableData: [{
        date: '2016-05-02',
        tasks: '4',
        num: '5',
        finish: '1',
      }, {
        date: '2016-05-04',
        tasks: '6',
        num: '3',
        finish: '3',
      }, {
        date: '2016-05-01',
        tasks: '2',
        num: '6',
        finish: '1',
      }, {
        date: '2016-05-03',
        tasks: '7',
        num: '3',
        finish: '2',
      }, {
        date: '2016-05-01',
        tasks: '2',
        num: '6',
        finish: '1',
      }, {
        date: '2016-05-01',
        tasks: '2',
        num: '6',
        finish: '1',
      }, {
        date: '2016-05-01',
        tasks: '2',
        num: '6',
        finish: '1',
      }, {
        date: '2016-05-01',
        tasks: '2',
        num: '6',
        finish: '1',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.mission {
  padding: 20px 0;
  .title {
    padding-bottom: 18px;
    font-size: 18px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}
</style>
<style scoped>
.mission >>> .cell {
  text-align: right;
}
.mission >>> tr td:nth-child(1) .cell,
.mission >>> tr th:nth-child(1) .cell {
  text-align: left;
}
</style>
