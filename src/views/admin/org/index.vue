<template>
  <div>
    <basic-container>
      <page-header title="组织管理"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="handleAdd" size="small">添加组织</el-button>
          <!-- <el-dropdown size="medium">
            <el-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item divided>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search="search"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <template slot="before-columns">
          <el-table-column label="组织名称" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
              <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
              <el-button @click="handlePerson(scope.row, scope.index)" size="small">人员</el-button>
              <el-dropdown size="medium" @command="handleReview($event, scope.row.orgId)">
                <el-button size="small" type="default">审核<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="pass">通过</el-dropdown-item>
                  <el-dropdown-item command="reject">驳回</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <add-dialog-form ref="addDialogForm" @load-page="loadPage"></add-dialog-form>
    <person-dialog-form ref="personDialogForm" @load-page="loadPage"></person-dialog-form>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import OperationSearch from '@/components/Operation/Search'
import IepTable from '@/components/IepTable/'
import OperationWrapper from '@/components/Operation/Wrapper'
import AddDialogForm from './AddDialogForm'
import PersonDialogForm from './PersonDialogForm'
import OperationContainer from '@/components/Operation/Container'
import {
  addObj,
  putObj,
  delObj,
  fetchList,
  reviewById,
} from '@/api/admin/org'
import { dictsMap, columnsMap, initOrgForm } from './options'
import { mergeByFirst } from '@/util/util'
import mixins from './mixins'
export default {
  mixins: [mixins],
  components: { PageHeader, IepTable, OperationWrapper, OperationContainer, OperationSearch, AddDialogForm, PersonDialogForm },
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
    handlePerson (row) {
      this.$refs['personDialogForm'].orgId = row.orgId
      this.$refs['personDialogForm'].dialogShow = true
      this.$refs['personDialogForm'].load()
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, delObj)
    },
    handleEdit (row) {
      this.$refs['addDialogForm'].orgForm = mergeByFirst(initOrgForm(), row)
      this.$refs['addDialogForm'].methodName = '修改'
      this.$refs['addDialogForm'].formRequestFn = putObj
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['addDialogForm'].methodName = '创建'
      this.$refs['addDialogForm'].formRequestFn = addObj
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleReview (id, command) {
      reviewById(id, command).then(() => {
        this.loadPage()
      })
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>
