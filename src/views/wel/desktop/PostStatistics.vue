<template>
  <div class="gird-item">
    <el-card shadow="never" class="box-card" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <iep-page-header title="岗位统计"></iep-page-header>
      </div>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </iep-table>
    </el-card>
  </div>
</template>
<script>
import { getLibraryPage } from '@/api/hrms/post_library'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    prop: 'name',
    label: '岗位名称',
  },
  {
    prop: 'typeName',
    label: '岗位分类',
  },
  {
    prop: 'count',
    label: '在职人数',
  },
]
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      isLoadTable: false,
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getLibraryPage)
    },
  },
}
</script>
<style scoped lang='scss'>
.form-detail {
  display: flex;
  justify-content: space-around;
}
.gird-item .el-card {
  padding: 0 20px;
}
</style>
<style scoped>
.gird-item >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gird-item >>> .el-table th {
  background-color: #f5f7fa;
}
.gird-item >>> .page-title {
  font-size: 16px !important;
}

.gird-item >>> .title-wrapper,
.gird-item >>> .title-col {
  margin-bottom: 0;
}
.gird-item >>> .el-card__header,
.gird-item >>> .el-card__body {
  padding: 18px 0;
}
</style>
