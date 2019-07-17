<template>
  <div>
    <basic-container>
      <iep-page-header title="组织盈亏" :replaceText="replaceText" :data="statistics">
      </iep-page-header>
      <operation-container>
        <template slot="right">
          <iep-date-picker size="small" v-model="yearDate" align="right" type="year" placeholder="选择年" @change="loadPage()"></iep-date-picker>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getOrgProfits } from '@/api/fams/statistics'
import { getYear } from '@/util/date'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      yearDate: new Date(),
      statistics: [0, 0],
      replaceText: (data) => `（${data[0]}年度${data[1]}组织盈亏）`,
    }
  },
  computed: {
    year () {
      return getYear(this.yearDate)
    },
    orgId () {
      if (this.$route.query.orgId) {
        return +this.$route.query.orgId
      } else {
        return this.userInfo.orgId
      }
    },
    orgName () {
      if (this.$route.query.orgName) {
        return +this.$route.query.orgName
      } else {
        return this.userInfo.orgName
      }
    },
    ...mapGetters(['userInfo']),
  },
  created () {
    this.statistics = [this.year, this.orgName]
    this.loadPage()
  },
  methods: {
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getOrgProfits(this.orgId, this.year)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>