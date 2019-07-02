<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="time" label="时间">
      </el-table-column>
      <el-table-column prop="total" label="销售总数">
      </el-table-column>
      <el-table-column prop="increment" label="增量">
      </el-table-column>
      <el-table-column prop="than" label="同比">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '产品销售',
      tableData: [{
        time: '2019-06-11',
        total: '24',
        increment: '5',
        than: '19%',
      }, {
        time: '2019-06-04',
        total: '26',
        increment: '33',
        than: '13%',
      }, {
        time: '2019-05-27',
        total: '25',
        increment: '26',
        than: '16%',
      }, {
        time: '2019-05-20',
        total: '17',
        increment: '223',
        than: '22%',
      }, {
        time: '2019-05-13',
        total: '2',
        increment: '56',
        than: '35%',
      }, {
        time: '2019-05-06',
        total: '2',
        increment: '36',
        than: '21%',
      }, {
        time: '2019-04-29',
        total: '2',
        increment: '66',
        than: '15%',
      }, {
        time: '2019-04-22',
        total: '2',
        increment: '76',
        than: '10%',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  margin-bottom: 30px;
  padding-bottom: 20px;
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
