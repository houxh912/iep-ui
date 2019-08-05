<template>
  <div class="year">
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>年度支出</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker size="small" v-model="yearMonth" align="right" type="year" placeholder="选择年" @change="searchPage()"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :height="tableHeight" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" :summary-method="getSummaries" show-summary is-tree>
      <el-table-column label="金额">
        <el-table-column prop="actualExpenditure" label="实际支出">
        </el-table-column>
        <el-table-column prop="budgetExpenditure" label="预计支出">
        </el-table-column>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getExpenditureList } from '@/api/fams/statistics'
import { columnsMap, initNow, getYear } from './options'
export default {
  data () {
    return {
      columnsMap,
      yearMonth: initNow(),
      isLoadTable: true,
      pagedTable: [],
      statistics: ['', 0, 0],
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  computed: {
    newSearchForm () {
      return {
        year: getYear(this.yearMonth),
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
      this.statistics[1] = data.data.expenditureTotal
      this.statistics[2] = data.data.budgetTotal
      this.isLoadTable = false
    },
    searchPage () {
      this.loadPage(this.newSearchForm)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExpenditureList(3))
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const idx = index - 1
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = (this.statistics[idx])
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
  },
}
</script>

