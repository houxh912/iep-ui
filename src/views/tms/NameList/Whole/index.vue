<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
        <iep-button icon="el-icon-delete" @click="handleMoreDelete">删除</iep-button>
        <iep-button icon="el-icon-remove-outline" @click="handleMoreLock">禁用</iep-button>
        <iep-button icon="el-icon-edit" @click="handleMoreReLock">启用</iep-button>
        <iep-button icon="el-icon-upload" @click="handleImport">Excel导入</iep-button>
        <!-- <iep-button>表头设置</iep-button> -->
      </template>
      <template slot="right">
        <operation-search prop="name" @search-page="searchPage" advance-search placeholder="请输入名称进行搜索">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap" @selection-change="selectionChange">
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="primary" plain>编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            <iep-button @click="handleLock(scope.row)">{{scope.row.lockFlag=='0'?'禁用':'启用'}}</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <form-dialog ref="formDialog" @load-page="loadPage"></form-dialog>
  </div>
</template>>
<script>
import { columnsMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import formDialog from './formDialog'
import { pageList, deletePageById, deleteMorePage, getLockById, getReLockById, getLock, getReLock } from '@/api/admin/name_list'
export default {
  components: { AdvanceSearch, formDialog },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap,
      multipleSelection: [],
      importDialogShow: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: '/tms/nameList_edit/0',
      })
    },
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleEdit (row) {
      this.$router.push({
        path: `/tms/nameList_edit/${row.id}`,
      })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deletePageById)
    },
    handleMoreDelete () {
      deleteMorePage(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleLock (row) {
      if (row.lockFlag === '1') {
        getReLockById(row.id).then(() => {
          this.loadPage()
        })
      }
      if (row.lockFlag === '0') {
        getLockById(row.id).then(() => {
          this.loadPage()
        })
      }

    },
    handleMoreLock () {
      getLock(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleMoreReLock () {
      getReLock(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleImport () {
      this.$refs['formDialog'].importDialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, pageList)
    },
  },
}
</script>>