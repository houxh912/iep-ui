<template>
  <div>
    <basic-container>
      <iep-page-header title="模块管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" :dictsMap="dictsMap" :columnsMap="columnsMap" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="名称" min-width="200px">
            <template slot-scope="scope">
              <iep-table-link-img-desc :img="scope.row.logo" :desc="scope.row.description" :name="scope.row.name" @m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
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
import DialogForm from './DialogForm'
import { getModulePage, postModule, putModule, deleteModuleById } from '@/api/admin/module'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { initForm, dictsMap, columnsMap } from './options'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      // cpms_products_add: false,
      // cpms_products_view: false,
      // cpms_products_edit_del: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    // this.cpms_products_add = this.permissions['cpms_products_add']
    // this.cpms_products_view = this.permissions['cpms_products_view']
    // this.cpms_products_edit_del = this.permissions['cpms_products_edit_del']
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postModule
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].formRequestFn = putModule
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].dialogShow = true
    },
    handleDetail (row) {
      console.log(row)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteModuleById)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getModulePage)
    },
  },
}
</script>
