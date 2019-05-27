<template>
  <div class="year">
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>季度支出</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker size="small" v-model="yearMonth" align="right" type="year" placeholder="选择年" @change="searchPage()"></iep-date-picker>
        <el-select v-model="quarter" size="small" placeholder="请选择季度" @change="searchPage()">
          <el-option v-for="(v, k) in quarterOptions" :key="k" :label="v" :value="k">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :height="tableHeight" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary :summary-method="getSummaries" is-tree>
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
import { getSummaries } from '@/util/table'
import { getExpenditureList } from '@/api/fams/statistics'
import { columnsMap, initNow, getYear } from './options'
export default {
  data () {
    return {
      columnsMap,
      yearMonth: initNow(),
      quarter: '',
      quarterOptions: {
        '1': '一季度',
        '2': '二季度',
        '3': '三季度',
        '4': '四季度',
      },
      isLoadTable: true,
      pagedTable: [],
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  computed: {
    newSearchForm () {
      return {
        year: getYear(this.yearMonth),
        quarter: this.quarter,
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
      this.quarter = data.data.quarter + ''
      this.isLoadTable = false
    },
    searchPage () {
      this.loadPage(this.newSearchForm)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExpenditureList(2))
    },
    getSummaries,
  },
}
</script>

