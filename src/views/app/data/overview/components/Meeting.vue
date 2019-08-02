<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="分类">
      </el-table-column>
      <el-table-column prop="count" label="会议数">
      </el-table-column>
      <el-table-column prop="increment" label="增量">
      </el-table-column>
      <el-table-column prop="proportion" label="占比">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getweek } from '@/api/app/mlms/'
export default {
  data () {
    return {
      title: '会议概况',
      tableData: [],
    }
  },
  created () {
    getweek().then(({ data }) => {
      this.tableData = data.data
    })
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
  transition: 0.5s;
}
.statistics >>> tr td:nth-child(1) .cell,
.statistics >>> tr th:nth-child(1) .cell {
  text-align: left;
}
</style>
