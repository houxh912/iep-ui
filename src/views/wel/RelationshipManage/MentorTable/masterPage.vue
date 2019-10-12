<template>
  <div>
    <iep-page-header title="我的师父"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMapMaster" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
      </template>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleRelease(scope.row)">解除关系</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getMyMaster, deleteReleaseMentorById } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import { columnsMapMaster } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMapMaster,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRelease (row) {
      // this._handleGlobalDeleteById(row.relatedId, deleteReleaseMentorById)
      this.$confirm('此操作将永久解除师徒关系, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteReleaseMentorById(row.relatedId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '解除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `解除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyMaster)
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
