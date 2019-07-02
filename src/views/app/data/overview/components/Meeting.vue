<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="type" label="分类">
      </el-table-column>
      <el-table-column prop="meet" label="会议数">
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
      title: '本周会议概况',
      tableData: [{
        type: '日常例会',
        meet: '24',
        increment: '5',
        than: '19%',
      }, {
        type: '管理会议',
        meet: '26',
        increment: '33',
        than: '13%',
      }, {
        type: '市场会议',
        meet: '25',
        increment: '26',
        than: '16%',
      }, {
        type: '项目会议',
        meet: '17',
        increment: '223',
        than: '22%',
      }, {
        type: '产品会议',
        meet: '2',
        increment: '56',
        than: '35%',
      }, {
        type: '培训会议',
        meet: '2',
        increment: '36',
        than: '21%',
      }, {
        type: '拜访会议',
        meet: '2',
        increment: '66',
        than: '15%',
      }, {
        type: '其它会议',
        meet: '2',
        increment: '76',
        than: '10%',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  .title {
    padding-bottom: 10px;
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
