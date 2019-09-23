<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="拜访时间">
      </el-table-column>
      <el-table-column prop="count" label="拜访总数">
      </el-table-column>
      <el-table-column prop="increment" label="面访">
      </el-table-column>
      <el-table-column prop="other" label="远程">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getvisit } from '@/api/app/mlms/'
export default {
  data () {
    return {
      title: '客户拜访',
      tableData: [],
    }
  },
  created () {
    getvisit().then(({data}) => {
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
