<template>
  <div class="year">
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>月度收入</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker size="small" v-model="yearMonth" align="right" type="month" placeholder="选择年" @change="searchPage()"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :height="tableHeight" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" :summary-method="getSummaries" show-summary is-tree>
      <el-table-column prop="actualIncome" label="实际收入"></el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getIncomeList } from '@/api/fams/statistics'
import { columnsMap, initNow, getMonth } from './options'
export default {
  data () {
    return {
      columnsMap,
      yearMonth: initNow(),
      isLoadTable: true,
      pagedTable: [],
      statistics: [0],
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  computed: {
    newSearchForm () {
      return {
        month: getMonth(this.yearMonth),
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadTable (param, requestFn) {
      this.isLoadTable = true
      const { data } = await requestFn({ ...param, ...this.pageOption })
      this.pagedTable = data.data.list
      this.statistics[0] = data.data.inComeTotal
      this.isLoadTable = false
    },
    searchPage () {
      this.loadPage(this.newSearchForm)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getIncomeList(1))
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = (this.statistics[0])
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
  },
}
</script>

