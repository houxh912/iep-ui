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
        date: '2019/7/5',
        tasks: '44',
        num: '125',
        finish: '41',
      }, {
        date: '2019/7/4',
        tasks: '56',
        num: '173',
        finish: '53',
      }, {
        date: '2019/7/3',
        tasks: '42',
        num: '116',
        finish: '41',
      }, {
        date: '2019/7/2',
        tasks: '27',
        num: '93',
        finish: '22',
      }, {
        date: '2019/7/1',
        tasks: '31',
        num: '102',
        finish: '22',
      }, {
        date: '2019/6/30',
        tasks: '13',
        num: '26',
        finish: '10',
      }, {
        date: '2019/6/29',
        tasks: '11',
        num: '40',
        finish: '7',
      }, {
        date: '2019/6/28',
        tasks: '21',
        num: '68',
        finish: '14',
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
