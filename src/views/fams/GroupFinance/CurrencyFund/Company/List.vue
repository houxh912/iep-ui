<template>
  <div>
    <operation-container>
      <template slot="right">
        <iep-date-picker size="small" v-model="date" align="right" type="month" placeholder="选择年月" @change="loadPage()"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle" show-summary></iep-table>
  </div>
</template>

<script>
import { getCompanyCurrencyFund } from '@/api/fams/statistics'
import { getYearMonth } from '@/util/date'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      date: '',
    }
  },
  computed: {
    yearMonth () {
      return getYearMonth(this.date)
    },
  },
  created () {
    this.statistics = [this.year, this.orgName]
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$emit('onDetail', {
        id: row.id,
      })
    },
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getCompanyCurrencyFund(this.yearMonth)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>