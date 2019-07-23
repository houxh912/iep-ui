<template>
  <div>
    <basic-container>
      <iep-page-header title="个人账户" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="realName" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="warning" plain @click="handleDetail(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import AdvanceSearch from './AdvanceSearch'
import { getPersonalPage } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（个人国脉贝统计：${data[0]} ）`,
      statistics: [0],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: '/wel/wealth/wealth_flow',
        query: { name: row.realName, id: row.id },
      })
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getPersonalPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
