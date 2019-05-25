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
    <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary :summary-method="getSummaries">
      <el-table-column label="金额">
        <el-table-column prop="inCome" label="收入">
        </el-table-column>
        <el-table-column prop="expenditure" label="支出">
        </el-table-column>
        <el-table-column prop="currentBalance" label="本期余额">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getSummaries } from '@/util/table'
import { getBankDiaryList } from '@/api/fams/statistics'
import { columnsMap, initNow, getYear } from './options'
export default {
  data () {
    return {
      columnsMap,
      yearMonth: initNow(),
      isLoadTable: true,
      pagedTable: [],
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
      this.companyId = data.data.companyId
      this.bankId = data.data.bankId
      this.pagedTable = data.data.diaryList
      this.statistics = [data.data.expenditureTotal, data.data.inComeTotal]
      this.isLoadTable = false
    },
    searchPage () {
      this.loadPage(this.newSearchForm)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBankDiaryList)
    },
    getSummaries,
  },
}
</script>
<style scoped>
.year >>> .el-table .cell {
  text-align: center;
}
</style>



