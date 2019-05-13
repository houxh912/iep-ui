<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" @click="handleReview(scope.row)" plain>审核</iep-button>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import DialogForm from './DialogForm'
import { addObj, putOrg, deleteJobBatch, deleteJobById, reviewApprovaBatch } from '@/api/goms/org_thing'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, initForm, dictsMap } from './options'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteJobBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteJobById)
    },
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '修改'
      this.$refs['DialogForm'].formRequestFn = putOrg
      this.$refs['DialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage () {
      //this.loadTable(param, getJobPage)
    },
  },
}
</script>


