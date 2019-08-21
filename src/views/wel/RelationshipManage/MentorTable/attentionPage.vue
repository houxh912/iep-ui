<template>
  <div>
    <iep-page-header title="我的关注"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMapAttention" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
      </template>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleRelease(scope.row)">取消关注</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getMyAttentionPage } from '@/api/wel/relationship_manage'
import { unfollowById } from '@/api/cpms/iepuserfollow'
import mixins from '@/mixins/mixins'
import { columnsMapAttention } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMapAttention,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRelease (row) {
      // this._handleGlobalDeleteById(row.userId, deleteReleaseApprenticeById)
      this.$confirm('此操作将永久取消关注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        unfollowById(row.id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '取消关注成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `取消关注失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyAttentionPage)
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
