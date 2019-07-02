<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="type" label="分类">
      </el-table-column>
      <el-table-column prop="data" label="资料数">
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
      title: '资料统计',
      tableData: [{
        type: '规章制度',
        data: '24',
        increment: '5',
        than: '19%',
      }, {
        type: '市场项目',
        data: '26',
        increment: '33',
        than: '13%',
      }, {
        type: '学习人力',
        data: '25',
        increment: '26',
        than: '16%',
      }, {
        type: '产品与技术',
        data: '17',
        increment: '223',
        than: '22%',
      }, {
        type: '平台运营',
        data: '2',
        increment: '56',
        than: '35%',
      }, {
        type: '品牌形象',
        data: '2',
        increment: '36',
        than: '21%',
      }, {
        type: '智库研究',
        data: '2',
        increment: '66',
        than: '15%',
      }, {
        type: '财务投资',
        data: '2',
        increment: '76',
        than: '10%',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics {
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
.statistics >>> .cell {
  text-align: right;
}
.statistics >>> tr td:nth-child(1) .cell,
.statistics >>> tr th:nth-child(1) .cell {
  text-align: left;
}
</style>
