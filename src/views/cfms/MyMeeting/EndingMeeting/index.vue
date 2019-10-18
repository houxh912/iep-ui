<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click=" handleSee(scope.row)">查看</iep-button>
            <iep-button type="warning" plain @click=" handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { getMeetingmarketingStatus, meetingmarketingDelete } from '@/api/mcms/meeting'
import { columns } from '../option.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columns,
      isLoadTable: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = { meetingFlag: 3 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleSee (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
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