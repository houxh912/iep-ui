<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>四季度预算</div>
      </template>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table v-loading="loading" :data="budgetTableRelation" style="width: 100%" show-summary :summary-method="getSummaries">
      <el-table-column prop="typeName" label="预算项">
      </el-table-column>
      <el-table-column v-for="item in budgetTable" :key="item.id" :label="item.time + '季度'">
        <el-table-column prop="budget" label="预算">
          <template slot-scope="scope">
            <div @dblclick="handleDetail(item, scope)">{{getValue(item, scope, 'budget')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际">
          <template slot-scope="scope">
            <div @dblclick="handleDetail(item, scope)">{{getValue(item, scope, 'actual')}}</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getBudgetQuarterList, getBudgetYearList, putBudgetQuarterRelation } from '@/api/fams/budget'
import DialogForm from './DialogForm'
import { initForm } from './options'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
export default {
  props: {
    yearId: {
      type: Number,
      required: true,
    },
  },
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      loading: false,
      budgetId: this.yearId,
      budgetTime: '',
      yearList: [],
      budgetTableRelation: [],
      budgetTable: [],
      budgetMap: {},
    }
  },
  created () {
    this.loadYearList()
    this.loadPage()
  },
  methods: {
    getSummaries (param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const realIndex = Math.ceil(index / 2)
        const data = this.budgetTable[realIndex - 1].relation
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
    getValue (item, scope, tName) {
      return this.budgetMap[item.time].relation[scope.$index][tName]
    },
    handleDetail (item, scope) {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.id = item.id
      this.$refs['DialogForm'].form.type = scope.row.type
      this.$refs['DialogForm'].form.budget = this.getValue(item, scope, 'budget')
      this.$refs['DialogForm'].form.actual = this.getValue(item, scope, 'actual')
      this.$refs['DialogForm'].formRequestFn = putBudgetQuarterRelation
      this.$refs['DialogForm'].dialogShow = true
    },
    handleChange () {
      this.loadPage()
    },
    async loadYearList () {
      const { data } = await getBudgetYearList()
      this.yearList = data.data
    },
    async loadPage () {
      this.loading = true
      const { data } = await getBudgetQuarterList(this.yearId)
      this.budgetTable = data.data
      this.budgetTableRelation = this.budgetTable[0].relation
      this.budgetMap = keyBy(this.budgetTable, 'time')
      this.loading = false
    },
  },
  watch: {
    budgetId (n) {
      this.$emit('on-change-year', n)
    },
  },
}
</script>



