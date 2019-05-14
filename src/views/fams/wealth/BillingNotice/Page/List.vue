<template>
  <div>
    <basic-container>
      <page-header title="开票通知"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button>发送</iep-button>
          <iep-button>撤回</iep-button>
          <iep-button>删除</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column label="发送人" width="90px">
          <template slot-scope="scope">
            <iep-button @click="handleSend(scope.row)">发送</iep-button>
            <iep-button>撤回</iep-button>
            <iep-button>删除</iep-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getMyBillingPage } from '@/api/fams/billing'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
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
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '新增',
        id: false,
      })
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyBillingPage)
    },
  },
}
</script>
