<template>
  <div>
    <basic-container>
      <iep-page-header title="我能平台账户交易流水"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getMyPage } from '@/api/fams/block_chain'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'amount',
          label: '能贝数量',
        },
        {
          prop: 'currentAmount',
          label: '当前账户余额',
        },
        {
          prop: 'operationName',
          label: '操作人',
        },
        {
          prop: 'createTime',
          label: '发币日期',
        },
        {
          prop: 'remarks',
          label: '发行明细',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyPage)
    },
  },
}
</script>
