<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columns" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="会议海报">
          <template slot-scope="scope">
            <div>
              <el-image :src="scope.row.urls" :fit="fit"></el-image>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleDetail(scope.row)">查看</iep-button>
            <iep-button type="warning" plain @click="handleEdit(scope.row)">修改</iep-button>
            <iep-button type="warning" plain @click=" handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-view ref="DialogView" @loadPage="loadPage"></dialog-view>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import { getMeetingmarketingStatus, meetingmarketingDelete } from '@/api/mcms/meeting'
import { columns } from '../option.js'
import DialogView from '../AuditedMeeting/DialogView.vue'
export default {
  mixins: [mixins],
  components: { DialogView },
  data () {
    return {
      columns,
      isLoadTable: false,
      fit: 'contain',
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
    loadPage (param = { meetingFlag: 5 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
      })
    },
    handleEdit (row) {
      console.log(row.meetingReason)
      this.$refs['DialogView'].dialogShow = true
      this.$refs['DialogView'].id = row.id
      this.$refs['DialogView'].edit = '修改'
      this.$refs['DialogView'].formData.meetingReason = row.meetingReason

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
<style lang="scss" scoped>
.el-image {
  width: 150px;
  height: 100px;
  border-radius: 10px;
}
</style>