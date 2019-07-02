<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="time" label="拜访时间">
      </el-table-column>
      <el-table-column prop="total" label="拜访总数">
      </el-table-column>
      <el-table-column prop="interview" label="面访">
      </el-table-column>
      <el-table-column prop="remote" label="远程">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '客户拜访',
      tableData: [{
        time: '2019-06-11',
        total: '24',
        interview: '5',
        remote: '19',
      }, {
        time: '2019-06-04',
        total: '26',
        interview: '33',
        remote: '13',
      }, {
        time: '2019-05-27',
        total: '25',
        interview: '26',
        remote: '16',
      }, {
        time: '2019-05-20',
        total: '17',
        interview: '223',
        remote: '22',
      }, {
        time: '2019-05-13',
        total: '2',
        interview: '56',
        remote: '35',
      }, {
        time: '2019-05-06',
        total: '2',
        interview: '36',
        remote: '21',
      }, {
        time: '2019-04-29',
        total: '2',
        interview: '66',
        remote: '15',
      }, {
        time: '2019-04-22',
        total: '2',
        interview: '76',
        remote: '10',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  .title {
    padding-bottom: 18px;
    font-size: 18px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}
</style>
<style scoped>
.statistics >>> .cell {
  text-align: right;
}
.statistics >>> tr td:nth-child(1) .cell,
.statistics >>> tr th:nth-child(1) .cell {
  text-align: left;
}
</style>
