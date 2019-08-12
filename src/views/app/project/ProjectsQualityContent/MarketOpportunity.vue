<template>
  <div class="opportunity">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="opportunity-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="projectLevel" label="意向程度" width="80"></el-table-column>
        </el-table>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getOpportunity } from '@/api/app/prms/'
export default {
  data () {
    return {
      title: '市场机会',
      linkName: '',
      tableData: [],
    }
  },
  created () {
    getOpportunity().then(({ data }) => {
      this.tableData = data.data.records.slice(0, 4)
    })
  },
}
</script>
<style lang="scss" scoped>
</style>
<style scoped>
.opportunity >>> .el-table th {
  background-color: #fafafa;
}
.opportunity >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.opportunity >>> .el-table__row:last-child >>> td {
  border: 0;
}
.opportunity >>> .el-card {
  height: 316px;
}
</style>
