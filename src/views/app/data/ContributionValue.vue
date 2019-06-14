<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="num" label="贡献值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '贡献值排行',
      tableData: [{
        name: '郑爱军',
        num: '1000',
      }, {
        name: '杨冰之',
        num: '1000',
      }, {
        name: '王路燕',
        num: '900',
      }, {
        name: '李凯',
        num: '900',
      }, {
        name: '谢海燕',
        num: '880',
      }, {
        name: '黄磊',
        num: '880',
      }, {
        name: '陈泽红',
        num: '870',
      }, {
        name: '张金星',
        num: '790',
      }, {
        name: '王凯',
        num: '780',
      }, {
        name: '刘丹',
        num: '770',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  padding: 0 0 20px;
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
.statistics >>> tr td:nth-child(1) .cell {
  color: #0054a3;
  cursor: pointer;
}
.statistics >>> tr td:nth-child(1) .cell:hover {
  color: #1978d1;
}
.statistics >>> tr td:nth-child(1) .cell,
.statistics >>> tr th:nth-child(1) .cell {
  text-align: left;
}
</style>
