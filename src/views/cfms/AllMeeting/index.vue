<template>
  <basic-container>
    <iep-page-header title="全部会议"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="250">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click=" handleEdit(scope.row)">修改会议</iep-button>
            <iep-button type="warning" plain @click=" handleName(scope.row)">名单管理</iep-button>
            <iep-button type="warning" plain @click=" handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <name-dialog ref="NameDialog" @load-page="loadPage"></name-dialog>
  </basic-container>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columns } from './option'
import { getMeetingmarketingStatus, meetingmarketingDelete } from '@/api/mcms/meeting'
import NameDialog from './NameDialog'
export default {
  mixins: [mixins],
  components: { NameDialog },
  data () {
    return {
      columns,
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = { isAll: 1 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleName (row) {
      this.$refs['NameDialog'].dialogShow = true
      this.$refs['NameDialog'].id = row.id
      this.$refs['NameDialog'].loadPage()
    },
    handleEdit (row) {
      this.$router.push({
        path: `/cfms_spa/meeting_edit/${row.id}`,
        query: {
          edit: true,
        },
      })
    },
    handleDelete (row) {
      this.$confirm('是否删除该条会议？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        meetingmarketingDelete({ id: [row.id] }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
          this.loadPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })

    },
  },
}
</script>