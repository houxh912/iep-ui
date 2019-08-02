<template>
  <div>
    <iep-page-header title="我的徒弟"></iep-page-header>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMapApprentice" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
      </template>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button v-show="scope.row.status==1" type="warning" plain @click="handleRelease(scope.row)">解除关系</iep-button>
            <iep-button v-show="scope.row.status==0" type="warning" plain @click="handleDetail(scope.row)">查看申请</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getMyApprentice, deleteReleaseApprenticeById } from '@/api/wel/relationship_manage'
import mixins from '@/mixins/mixins'
import { columnsMapApprentice } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMapApprentice,
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
      this.$confirm('此操作将永久解除师徒关系, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteReleaseApprenticeById(row.userId).then(res => {
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
      this.loadTable(param, getMyApprentice)
    },
    handleDetail (row) {
      this.$router.push(`/wel/masterConfirm/${row.characterId}`)
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
