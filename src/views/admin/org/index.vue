<template>
  <div>
    <basic-container>
      <page-header title="组织管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger">添加组织</iep-button>
          <iep-button @click="handleReviewDialog">批量审核</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection is-index>
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
              <iep-button type="warning" @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
              <iep-button @click="handlePerson(scope.row, scope.index)">人员</iep-button>
              <iep-button type="default" @click="handleReviewDialog(scope.row, scope.index)">审核</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <add-dialog-form ref="addDialogForm" @load-page="loadPage"></add-dialog-form>
    <person-dialog-form ref="personDialogForm" @load-page="loadPage"></person-dialog-form>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import AddDialogForm from './AddDialogForm'
import PersonDialogForm from './PersonDialogForm'
import { addObj, putObj, delObj, fetchList, reviewById } from '@/api/admin/org'
import IepReviewConfirm from '@/components/IepCommon/ReviewConfirm'
import { dictsMap, columnsMap, initForm, initOrgSearchForm } from './options'
import { mergeByFirst } from '@/util/util'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { AddDialogForm, PersonDialogForm, IepReviewConfirm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initOrgSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initOrgSearchForm()
    },
    handlePerson (row) {
      this.$refs['personDialogForm'].orgId = row.orgId
      this.$refs['personDialogForm'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, delObj)
    },
    handleEdit (row) {
      this.$refs['addDialogForm'].form = mergeByFirst(initForm(), row)
      this.$refs['addDialogForm'].methodName = '修改'
      this.$refs['addDialogForm'].formRequestFn = putObj
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['addDialogForm'].methodName = '创建'
      this.$refs['addDialogForm'].formRequestFn = addObj
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleReviewDialog (row) {
      if (row.orgId) {
        this.$refs['iepReviewForm'].id = row.orgId
      } else {
        this.$refs['iepReviewForm'].ids = this.multipleSelection
      }
      this.$refs['iepReviewForm'].requestFn = reviewById
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>
