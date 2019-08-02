<template>
  <div>
    <basic-container>
      <iep-page-header :title="`${applyName}财富流水`" :replaceText="replaceText" :data="statistics" :backOption="backOption">
      </iep-page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AdvanceSearch from './AdvanceSearch'
import { getWealthFlowPage } from '@/api/fams/wealth_flow'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      applyName: '',
      backOption: {
        isBack: false,
      },
      statistics: [0, 0, 0, 0],
      replaceText: (data) => `（支出：${data[0]} 笔 ${data[1]} 贝，收入：${data[2]} 笔 ${data[3]} 贝）`,
      paramsId: '',
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.applyName = this.$route.query.name ? this.$route.query.name : ''
    this.backOption.isBack = this.$route.query.name ? true : false
    this.paramsId = this.$route.query.id || this.$route.params.id
    this.loadPage()
  },
  methods: {
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable({ ...param, userId: this.paramsId ? this.paramsId : this.userInfo.userId }, getWealthFlowPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>