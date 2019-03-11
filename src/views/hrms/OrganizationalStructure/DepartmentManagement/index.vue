<template>
  <div>
    <basic-container>
      <page-header title="部门管理" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="(scope.row)" type="danger" icon="el-icon-plus">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
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
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection is-tree>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleAdd(scope.row)">添加子部门</iep-button>
              <iep-button @click="add(scope.row)">编辑</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleMove(scope.row)">移动</el-dropdown-item>
                  <el-dropdown-item @click.native="handleMerge(scope.row)">合并</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <add-dialog ref="AddDialog" @load-page="loadPage"></add-dialog>
    <merge-dialog ref="MoveDialog" @load-page="loadPage"></merge-dialog>
    <move-dialog ref="MergeDialog" @load-page="loadPage"></move-dialog>
  </div>
</template>

<script>
import { getDepartmentManagePage } from '@/api/hrms/department_management'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
import AddDialog from './AddDialog'
import MoveDialog from './MoveDialog'
import MergeDialog from './MergeDialog'
export default {
  mixins: [mixins],
  components: { AddDialog, MoveDialog, MergeDialog },
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
    handleAdd (row) {
      console.log(row)
      this.$refs['AddDialog'].dialogShow = true
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
      this.loadTable(param, getDepartmentManagePage)
    },
    add () {

    },
  },
}
</script>

