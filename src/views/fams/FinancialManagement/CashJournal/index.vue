<template>
  <div>
    <basic-container>
      <page-header title="现金日记账"></page-header>
      <operation-container>
        <template slot="left">
          <iep-select v-model="companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择公司"></iep-select>
        </template>
        <template slot="right">
          <el-date-picker v-model="dateValue" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :is-pagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" show-summary :summary-method="getSummaries">
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
import { getCashDiaryList } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      companyId: '0',
      dateValue: '',
      cashAccount: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          },
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          },
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          },
        }],
      },
      searchForm: initSearchForm(),
      replaceText: (data) => `（所属公司：${data[0]}）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCashDiaryList)
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
          sums[index] = 'N/A'
        }
      })

      return sums
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
