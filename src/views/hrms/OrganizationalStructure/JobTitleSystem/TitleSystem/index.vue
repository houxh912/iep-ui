<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="danger" icon="el-icon-plus">新增</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
            <el-dropdown-item divided>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-dropdown-item>分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="280">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
  </div>
</template>
<script>
import AddDialogForm from './AddDialogForm'
import { getTitlePage, putTitle, postTitle, deleteTitleBatch, deleteTitleById } from '@/api/hrms/title_system'
import mixins from '@/mixins/mixins'
import { mergeByFirst } from '@/util/util'
import { columnsMap, initSearchForm, initForm } from './options'
export default {
  components: { AddDialogForm },
  mixins: [mixins],
  data () {
    return {
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
      this._handleGlobalDeleteAll(deleteTitleBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTitleById)
    },
    handleEdit (row) {
      this.$refs['AddDialogForm'].form = mergeByFirst(initForm(), row)
      this.$refs['AddDialogForm'].methodName = '修改'
      this.$refs['AddDialogForm'].formRequestFn = putTitle
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['AddDialogForm'].methodName = '创建'
      this.$refs['AddDialogForm'].formRequestFn = postTitle
      this.$refs['AddDialogForm'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param) {
      this.loadTable(param, getTitlePage)
    },
  },
}
</script>



