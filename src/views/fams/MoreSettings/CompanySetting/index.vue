<template>
  <div>
    <basic-container>
      <iep-page-header title="线下公司设置"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-tree>
        <el-table-column label="操作" width="320px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row._level===1" @click="handleChild(scope.row)" icon="el-icon-plus" type="warning" plain>子公司</iep-button>
              <iep-button @click="handleSet(scope.row)">设置账户</iep-button>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <account-dialog-form ref="AccountDialogForm" @load-page="loadPage"></account-dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getCompanyPage, postCompany, putCompany, deleteCompanyById, getCompanyById } from '@/api/fams/company'
import DialogForm from './DialogForm'
import AccountDialogForm from './AccountDialogForm'
import { columnsMap, initForm } from './options'
export default {
  components: { DialogForm, AccountDialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteCompanyById)
    },
    handleSet (row) {
      getCompanyById(row.id).then(({ data }) => {
        this.$refs['AccountDialogForm'].form = data.data
        this.$refs['AccountDialogForm'].formRequestFn = putCompany
        this.$refs['AccountDialogForm'].dialogShow = true
      })
    },
    handleChild (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].form.id = ''
      this.$refs['DialogForm'].form.name = ''
      this.$refs['DialogForm'].form.parentId = row.id
      this.$refs['DialogForm'].form.parentName = row.name
      this.$refs['DialogForm'].formRequestFn = postCompany
      this.$refs['DialogForm'].methodName = '添加子公司'
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      getCompanyById(row.id).then(({ data }) => {
        this.$refs['DialogForm'].form = data.data
        this.$refs['DialogForm'].formRequestFn = putCompany
        this.$refs['DialogForm'].methodName = '编辑'
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postCompany
      this.$refs['DialogForm'].methodName = '新增'
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCompanyPage)
    },
  },
}
</script>