<template>
  <div class="contract">
    <operation-container>
      <template slot="right">
        <operation-search @search="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table 
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-index>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap } from '../options'
import { fetchList } from '@/api/crms/contract'
export default {
  name: 'contract',
  mixins: [ mixins ],
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
