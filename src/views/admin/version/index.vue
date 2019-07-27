<template>
  <div>
    <basic-container>
      <iep-page-header title="版本记录"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button>刪除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="username">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleEdit(scope.row)" plain>修改</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import { columnsMap, initForm } from './options'
import { getVersionPage, postVersion, putVersion, deleteVersionById } from '@/api/admin/version'
export default {
  components: {
    DialogForm,
  },
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
      this._handleGlobalDeleteById(row.id, deleteVersionById)
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].methodName = '新增'
      this.$refs['DialogForm'].formRequestFn = postVersion
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].methodName = '修改'
      this.$refs['DialogForm'].formRequestFn = putVersion
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getVersionPage)
    },
  },
}
</script>