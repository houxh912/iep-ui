<template>
  <div>
    <basic-container>
      <iep-page-header title="集团盈亏" :replaceText="replaceText" :data="statistics">
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
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      yearDate: new Date(),
      statistics: [0, 0],
      replaceText: (data) => `（${data[0]}年度集团盈亏）`,
    }
  },
  computed: {
    year () {
      return getYear(this.yearDate)
    },
  },
  created () {
    this.statistics = [this.year]
    this.loadPage()
  },
  methods: {
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getOrgProfits(null, this.year)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>