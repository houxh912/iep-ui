<template>
  <div>
    <basic-container>
      <iep-page-header title="能贝发币"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleIssue()" plain>发币</iep-button>
        </template>
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
import DialogForm from './DialogForm'
import { getCoinIssuePage } from '@/api/fams/block_chain'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap: [
        {
          prop: 'amount',
          label: '发币数量',
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
          type: 'detail',
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleIssue () {
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCoinIssuePage)
    },
  },
}
</script>
