<template>
  <div>
    <basic-container>
      <page-header title="联系人"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="handleAdd" size="small">新增</el-button>
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
        <el-table-column prop="operation" label="操作" min-width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
              <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <main-dialog ref="addDialogForm" @load-page="loadPage"></main-dialog>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import OperationContainer from '@/components/Operation/Container'
import OperationSearch from '@/components/Operation/Search'
import IepTable from '@/components/IepTable/'
import OperationWrapper from '@/components/Operation/Wrapper'
import mixins from '../Customer/mixins'
import MainDialog from './mainDialog'
import { addObj, putObj, delObj, fetchList, reviewById } from '@/api/admin/org'
import { columnsMap, initForm } from './const.js'
import { mergeByFirst } from '@/util/util'
export default {
  mixins: [mixins],
  components: { PageHeader, IepTable, OperationWrapper, OperationContainer, OperationSearch, MainDialog },
  data () {
    return {
      dictsMap: {},
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, delObj)
    },
    handleEdit (row) {
      this.$refs['addDialogForm'].orgForm = mergeByFirst(initForm(), row)
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
