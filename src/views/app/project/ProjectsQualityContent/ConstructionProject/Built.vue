<template>
  <div class="construction iep-basic-scroll">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" width="200">
      </el-table-column>
      <el-table-column prop="projectAmount" label="项目金额" width="180">
      </el-table-column>
      <el-table-column prop="projectType" label="承接部门">
      </el-table-column>
      <el-table-column prop="manager" label="项目经理" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
  data () {
    return {
      tableData: [],
    }
  },
  created () {
    
  },
}
</script>
<style scoped>
.construction >>> .el-table th {
  background-color: #fafafa;
}
.construction >>> .el-table tr {
  cursor: pointer;
}
.construction >>> .el-card__body {
  height: 332px;
}
.construction >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.construction >>> .el-table__body-wrapper {
  overflow-y: scroll;
}
</style>
