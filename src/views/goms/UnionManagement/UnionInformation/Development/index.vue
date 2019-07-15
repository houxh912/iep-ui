<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search-page="searchPage" prop="title">
        </operation-search>
      </template>
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
      <el-table-column prop="operation" label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
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
import { getHistoryPage, postHistory, putEvent, deleteEventById, deleteEvent } from '@/api/goms/union'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm, dictsMap } from './options'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
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
      this._handleGlobalDeleteAll(deleteEvent)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteEventById)
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '修改'
      this.$refs['DialogForm'].formRequestFn = putEvent
      this.$refs['DialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postHistory
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getHistoryPage)
    },
  },
}
</script>


