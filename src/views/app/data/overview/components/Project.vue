<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="时间">
      </el-table-column>
      <el-table-column prop="count" label="项目总数">
      </el-table-column>
      <el-table-column prop="increment" label="增量">
      </el-table-column>
      <el-table-column prop="proportion" label="占比">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOverview } from '@/api/app/prms'
export default {
  data () {
    return {
      title: '项目概况',
      tableData: [],
    }
  },
  created () {
    getOverview().then(({data}) => {
      this.tableData = data.data
    })
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
