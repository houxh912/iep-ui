<template>
  <div>
    <basic-container>
      <iep-page-header title="业务指标"></iep-page-header>
      <operation-container style="margin-top: 10px;">
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <template slot="before-columns">
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{calculateDate(scope.row)}}
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOrgProjectPage } from '@/api/fams/statistics'
import AdvanceSearch from './AdvanceSearch'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    calculateDate (row) {
      if (row.businessMonth) {
        return `${row.businessYear}年${row.businessMonth}月`
      } else {
        return `${row.businessYear}年`
      }
    },
    handleDetail (row) {
      this.$openPage(`/fams_spa/project/${row.orgId}?name=${row.orgName}`)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable(param, getOrgProjectPage)
    },
  },
}
</script>
<style scoped>
</style>
