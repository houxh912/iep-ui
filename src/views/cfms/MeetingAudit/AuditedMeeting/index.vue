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
            <iep-button type="warning" plain @click=" handleAdopt(scope.row)">通过</iep-button>
            <iep-button type="warning" plain @click=" handleNotAdopt(scope.row)">不通过</iep-button>
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
import { getMeetingmarketingStatus, postMeetingsignupUpdateStatus } from '@/api/mcms/meeting'
import { columns } from '../option.js'
import DialogView from './DialogView.vue'
export default {
  mixins: [mixins],
  components: { DialogView },
  data () {
    return {
      columns,
      fit: 'contain',
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
    loadPage (param = { meetingFlag: 1 }) {
      this.loadTable(param, getMeetingmarketingStatus)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/meeting/${row.id}`,
      })
    },
    handleAdopt (row) {
      this.$confirm('请确认是否通过审核？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        postMeetingsignupUpdateStatus({ id: row.id, status: 6 }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
          if (res.data.data == true) {
            this.loadPage()
          }
        })
      })
    },
    handleNotAdopt (row) {
      this.$refs['DialogView'].dialogShow = true
      this.$refs['DialogView'].id = row.id
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