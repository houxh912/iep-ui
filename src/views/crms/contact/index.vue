<template>
  <div>
    <basic-container>
      <page-header title="联系人"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" size="small" type="danger">新增</iep-button>
          <!-- <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item divided>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" min-width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <main-dialog ref="addDialogForm" @load-page="loadPage"></main-dialog>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import MainDialog from './mainDialog'
import { fetchList, createData, updateData, deleteDataById } from '@/api/crms/contact'
import { columnsMap, initForm } from './const.js'
import { mergeByFirst } from '@/util/util'
export default {
  mixins: [mixins],
  components: { MainDialog },
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
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    handleEdit (row) {
      this.$refs['addDialogForm'].formData = mergeByFirst(initForm(), row)
      this.$refs['addDialogForm'].methodName = '修改'
      this.$refs['addDialogForm'].formRequestFn = updateData
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['addDialogForm'].methodName = '创建'
      this.$refs['addDialogForm'].formRequestFn = createData
      this.$refs['addDialogForm'].dialogShow = true
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>
