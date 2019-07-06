<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="value" label="投资金额(万) ">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getInvestmentList } from '@/api/app/mlms/'
export default {
  data () {
    return {
      title: '投资达人排行',
      tableData: [],
    }
  },
  created () {
    getInvestmentList().then(({data}) => {
      this.tableData = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  padding: 0 0 15px;
  .title {
    padding-bottom: 15px;
    font-size: 16px;
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
