<template>
  <div>
    <basic-container>
      <iep-page-header title="银行存款日记账" :replaceText="replaceText" :data="statistics"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-select size="small" v-model="companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择公司" @change="searchPageByCompany()"></iep-select>
          <iep-select size="small" v-if="!bankOption.disabled" v-model="bankId" autocomplete="off" :prefix-url="bankOption.prefixUrl" placeholder="请选择银行账户" @change="searchPage()"></iep-select>
        </template>
        <template slot="right">
          <iep-date-picker size="small" v-model="yearMonth" align="right" type="month" placeholder="选择年月" @change="searchPage()"></iep-date-picker>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :height="tableHeight" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary :summary-method="getLastSummaries">
        <el-table-column label="金额(元)">
          <el-table-column prop="inCome" label="收入">
          </el-table-column>
          <el-table-column prop="expenditure" label="支出">
          </el-table-column>
          <el-table-column prop="currentBalance" label="本期余额">
          </el-table-column>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <iep-div-detail-switch :value="scope.row.remark"></iep-div-detail-switch>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getLastSummaries } from '@/util/table'
import { getBankDiaryList } from '@/api/fams/statistics'
import { columnsMap, initSearchForm, initNow, getYear, getMonth } from './options'
function initStatistics () {
  return [0, 0, 0]
}
export default {
  data () {
    return {
      columnsMap,
      yearMonth: initNow(),
      companyId: '',
      bankId: '',
      isLoadTable: true,
      pagedTable: [],
      tableHeight: 'calc(100vh - 200px)',
      searchForm: initSearchForm(),
      statistics: initStatistics(),
      replaceText: (data) => `（累计总支出：${data[0]}元，累计总收入：${data[1]}元，最新本期余额：${data[2]}元）`,
    }
  },
  computed: {
    bankOption () {
      if (this.companyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.companyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.companyId}`,
        }
      }
    },
    newSearchForm () {
      return {
        companyId: this.companyId,
        bankId: this.bankId,
        year: getYear(this.yearMonth),
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
      this.companyId = data.data.companyId
      this.bankId = data.data.bankId
      this.pagedTable = data.data.diaryList
      this.statistics = [data.data.expenditureTotal, data.data.inComeTotal, data.data.newTotal]
      this.isLoadTable = false
    },
    searchPageByCompany () {
      this.bankId = 0
      this.searchPage()
    },
    searchPage () {
      this.loadPage(this.newSearchForm)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBankDiaryList)
    },
    getLastSummaries,
  },
}
</script>
<style lang="scss" scoped>
</style>
