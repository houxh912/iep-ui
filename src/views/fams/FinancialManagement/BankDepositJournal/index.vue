<template>
  <div>
    <basic-container>
      <page-header title="银行存款日记账" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-select v-model="companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择公司" @change="searchPage()"></iep-select>
          <iep-select v-if="!bankOption.disabled" v-model="bankId" autocomplete="off" :prefix-url="bankOption.prefixUrl" placeholder="请选择银行账户" @change="searchPage()"></iep-select>
        </template>
        <template slot="right">
          <iep-date-picker v-model="yearMonth" align="right" type="month" placeholder="选择年月" @change="searchPage()"></iep-date-picker>
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
    </basic-container>
  </div>
</template>

<script>
import { getBankDiaryList } from '@/api/fams/statistics'
import { columnsMap, initSearchForm, initNow, getYear, getMonth } from './options'
export default {
  data () {
    return {
      columnsMap,
      yearMonth: initNow(),
      companyId: '',
      bankId: '',
      isLoadTable: true,
      pagedTable: [],
      searchForm: initSearchForm(),
      statistics: [0, 0],
      replaceText: (data) => `（累计总支出：${data[0]}元，累计总收入：${data[1]}元）`,
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
        month: getMonth(this.yearMonth) + 1,
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
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
