<template>
  <div>
    <basic-container>
      <page-header title="发票"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button>发送</iep-button>
          <iep-button>撤回</iep-button>
          <iep-button @click="handleDelete()">删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleSend(scope.row)">发送</iep-button>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getMyInvoicePage, postInvoice, deleteInvoiceById, deleteInvoiceBatch } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from '../options'
export default {
  mixins: [mixins],
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteInvoiceById)
    },
    handleDelete () {
      this._handleGlobalDeleteAll(this.multipleSelection, deleteInvoiceBatch)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/invoice_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyInvoicePage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '新增',
        id: false,
        formRequestFn: postInvoice,
      })
    },
  },
}
</script>
