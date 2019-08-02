<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="组织">
      </el-table-column>
      <el-table-column prop="credit" label="信用数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrgCredit } from '@/api/app/upms/'
export default {
  data () {
    return {
      title: '组织信用',
      tableData: [],
    }
  },
  created () {
    getOrgCredit().then(({ data }) => {
      this.tableData = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  padding: 15px 0;
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
  transition: 0.5s;
}
.statistics >>> tr td:nth-child(1) .cell:hover {
  color: #1978d1;
}
.statistics >>> tr td:nth-child(1) .cell,
.statistics >>> tr th:nth-child(1) .cell {
  text-align: left;
}
.statistics >>> tr td:nth-child(1) .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
