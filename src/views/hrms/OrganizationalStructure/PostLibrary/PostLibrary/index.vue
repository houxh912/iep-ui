<template>
  <div>
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
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="关键字">
              <el-input v-model="paramForm.theme" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item label="岗位类别">
              <el-select v-model="paramForm.type" placeholder="请选择岗位类别">
                <el-option label="岗位类别1" value="岗位类别1"></el-option>
                <el-option label="岗位类别2" value="岗位类别2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位名称">
              <el-select v-model="paramForm.type" placeholder="请选择岗位名称">
                <el-option label="岗位名称1" value="岗位名称1"></el-option>
                <el-option label="岗位名称2" value="岗位名称2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="280">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
            <iep-button @click="(scope.row)">发起招聘</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
  </div>
</template>
<script>
import { getPostLibraryPage, putPostLibrary, postPostLibrary, deletePostLibraryBatch, deletePostLibraryById } from '@/api/hrms/post_library'
import mixins from '@/mixins/mixins'
import { mergeByFirst } from '@/util/util'
import { columnsMap, initSearchForm, initForm } from './options'
import AddDialogForm from './AddDialogForm'
export default {
  mixins: [mixins],
  components: { AddDialogForm },
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
      this._handleGlobalDeleteAll(deletePostLibraryBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deletePostLibraryById)
    },
    handleEdit (row) {
      this.$refs['AddDialogForm'].form = mergeByFirst(initForm(), row)
      this.$refs['AddDialogForm'].methodName = '修改'
      this.$refs['AddDialogForm'].formRequestFn = putPostLibrary
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['AddDialogForm'].methodName = '创建'
      this.$refs['AddDialogForm'].formRequestFn = postPostLibrary
      this.$refs['AddDialogForm'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param) {
      this.loadTable(param, getPostLibraryPage)
    },
    edit () {

    },
  },
}
</script>
