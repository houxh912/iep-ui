<template>
  <div>
    <basic-container>
      <iep-page-header title="调拨申请"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getUnionBorrowPage } from '@/api/fams/org_borrow'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    changeType () {
      this.loadPage()
    },
    handleDetail (row) {
      if (row.status === 9) {
        return
      }
      this.$router.push({
        path: `/fams_spa/union_borrow_detail/${row.id}`,
        query: { approval: 'true' },
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionBorrowPage)
    },
  },
}
</script>
