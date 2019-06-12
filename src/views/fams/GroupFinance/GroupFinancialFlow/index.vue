<template>
  <div>
    <basic-container>
      <page-header title="集团流水"></page-header>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getGroupWealthFlowPage } from '@/api/fams/group_wealth_flow'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
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
    loadPage (param = this.searchForm) {
      this.loadTable(param, getGroupWealthFlowPage)
    },
  },
}
</script>
