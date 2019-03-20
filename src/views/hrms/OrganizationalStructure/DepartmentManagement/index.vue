<template>
  <div>
    <basic-container>
      <page-header title="部门管理" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger" icon="el-icon-plus" plain>新增</iep-button>
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
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection is-tree>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row._level===1" icon="el-icon-plus" @click="handleAdd(scope.row)" type="warning" plain>子部门</iep-button>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleMove(scope.row)">移动</el-dropdown-item>
                  <el-dropdown-item @click.native="handleMerge(scope.row)">合并</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
    <merge-dialog ref="MoveDialog" @load-page="loadPage"></merge-dialog>
    <move-dialog ref="MergeDialog" @load-page="loadPage"></move-dialog>
  </div>
</template>

<script>
import { getDeptPage, postDept, putDept, deleteDeptById, deleteDeptBatch } from '@/api/hrms/department_management'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, toDeptForm, toNewParentForm } from './options'
import AddDialogForm from './AddDialogForm'
import MoveDialog from './MoveDialog'
import MergeDialog from './MergeDialog'
export default {
  mixins: [mixins],
  components: { AddDialogForm, MoveDialog, MergeDialog },
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      replaceText: (data) => `（共有${data[0]}个部门)`,
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
      this._handleGlobalDeleteAll(deleteDeptBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteDeptById)
    },
    handleEdit (row) {
      this.$refs['AddDialogForm'].form = toDeptForm(row)
      this.$refs['AddDialogForm'].methodName = '修改'
      this.$refs['AddDialogForm'].formRequestFn = putDept
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleAdd (row) {
      this.$refs['AddDialogForm'].form = toNewParentForm(row)
      this.$refs['AddDialogForm'].methodName = '创建'
      this.$refs['AddDialogForm'].formRequestFn = postDept
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleMove (row) {
      console.log(row)
      this.$refs['MoveDialog'].dialogShow = true
    },
    handleMerge (row) {
      console.log(row)
      this.$refs['MergeDialog'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
    loadPage (param) {
      this.loadTable(param, getDeptPage)
    },
    add () {

    },
  },
}
</script>
