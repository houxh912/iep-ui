<template>
  <div>
    <basic-container>
      <iep-page-header title="模板管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" plain icon="el-icon-plus" @click="handleAdd">新增</iep-button>
        </template>
        <!-- <template slot="right">
          <operation-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{scope.row.createTime | parseToDay}}
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
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
import { columnsMap, dictsMap } from './options'
import mixins from '@/mixins/mixins'
import { getPage, createPage, updatePage, deleteById } from '@/api/ims/module_management'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      isLoadTable: false,
    }
  },
  // created () {
  //   this.loadPage()
  // },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = createPage
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleEdit (row) {
      this.$refs['DialogForm'].id = row.templateId
      this.$refs['DialogForm'].formRequestFn = updatePage
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.templateId, deleteById)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getPage)
    },
  },
}
</script>