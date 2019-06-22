<template>
  <div>
    <basic-container>
      <page-header title="其他应收账款"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="projectName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getExpenditurePage } from '@/api/fams/expenditure'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../../EManagement/options'
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
    loadPage (param = this.searchParam) {
      this.loadTable(param, getExpenditurePage)
    },
  },
}
</script>