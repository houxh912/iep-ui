<template>
  <div>
    <basic-container>
      <page-header title="发票"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" size="small" plain>新增</iep-button>
          <iep-button type="default" icon="iconfont icon-send" size="mini">发送</iep-button>
          <iep-button type="default" size="small">撤回</iep-button>
          <iep-button type="default" size="small">删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <iep-button @click="handleSend(scope.row)">发送</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getMyInvoicePage, postInvoice } from '@/api/fams/invoice'
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
    handleDetail (row) {
      this.$emit('onDetail', row)
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
