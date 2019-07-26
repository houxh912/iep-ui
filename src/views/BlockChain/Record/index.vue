<template>
  <div>
    <basic-container>
      <iep-page-header title="交易记录"></iep-page-header>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="hash" placeholder="输入Hash值查询交易信息">
            <!-- advance-search -->
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { columnsMap } from './options'
import { getPage } from '@/api/fams/block_chain'
import mixins from '@/mixins/mixins'
// import AdvanceSearch from './AdvanceSearch'
export default {
  // components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchForm) {
      try {
        await this.loadTable(param, getPage)
      } catch (error) {
        this.$message(error.message)
      }
    },
  },
}
</script>
