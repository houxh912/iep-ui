<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleReviewDialog" type="primary" plain>批量审核</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" :checkbox-init="checkboxInit" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection is-index>
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
              <iep-button :disabled="!scope.row.status" @click="handleReviewDialog(scope.row, scope.index)">审核</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm is-inverse ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getUnionPage, reviewById, getUnionModuleOrgById } from '@/api/goms/union'
import { dictsMap, columnsMap, checkboxInit } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      checkboxInit,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async handleDetail (row) {
      const { data } = await getUnionModuleOrgById(row.unionId)
      this.$refs['DialogForm'].form = { ...data.data }
      this.$refs['DialogForm'].dialogShow = true
    },
    handleReviewDialog (row) {
      if (row.unionId) {
        this.$refs['iepReviewForm'].id = row.unionId
      } else {
        // TODO: 是否多选提醒
        if (!this.multipleSelection.length) {
          this.$message('请先选择需要的选项')
          return
        }
        this.$refs['iepReviewForm'].ids = this.multipleSelection
      }
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].formRequestFn = reviewById
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.unionId)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionPage)
    },
  },
}
</script>
