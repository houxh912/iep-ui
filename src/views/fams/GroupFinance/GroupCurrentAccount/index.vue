<template>
  <div>
    <basic-container>
      <iep-page-header title="集团往来账" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getAllCurrentBillFlowPage } from '@/api/fams/current_bill_flow'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0],
      replaceText: (data) => `（收入：${data[0]}元，支出${data[1]}元，总计${data[2]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getAllCurrentBillFlowPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>