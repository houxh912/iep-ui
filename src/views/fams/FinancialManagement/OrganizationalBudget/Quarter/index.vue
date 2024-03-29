<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>{{year}}季度预算</div>
      </template>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table v-loading="loading" :data="budgetTableRelation" style="width: 100%" :height="tableHeight" show-summary :summary-method="getSummaries">
      <el-table-column prop="typeName" label="预算项">
      </el-table-column>
      <el-table-column v-for="item in budgetTable" :key="item.id" :label="getLabel(item)">
        <el-table-column prop="budget" label="预算(元)">
          <template slot-scope="scope">
            <div @dblclick="handleDetail(item, scope)">{{getValue(item, scope, 'budget') | parseToMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际支出(元)">
          <template slot-scope="scope">
            <div @dblclick="handleDetail(item, scope)">{{getValue(item, scope, 'actual') | parseToMoney}}</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getSummariesInBudget } from '@/util/table'
import { getBudgetQuarterDetail, putBudgetQuarterRelation } from '@/api/fams/budget'
import DialogForm from './DialogForm'
import { initForm } from './options'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
export default {
  props: {
    year: {
      type: Number,
      required: true,
    },
    yearId: {
      type: Number,
      required: true,
    },
    yearList: {
      type: Array,
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
      budgetTableRelation: [],
      budgetTable: [],
      budgetMap: {},
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  computed: {
    getSummaries () {
      return getSummariesInBudget(this.budgetTable)
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    getLabel (item) {
      return item.flag ? item.time + '年度' : item.time + '季度'
    },
    getValue (item, scope, tName) {
      return this.budgetMap[item.id].relation[scope.$index][tName]
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
    async loadPage () {
      this.loading = true
      const { data } = await getBudgetQuarterDetail(this.yearId)
      this.budgetTable = data.data
      this.budgetTableRelation = this.budgetTable[0].relation
      this.budgetMap = keyBy(this.budgetTable, 'id')
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



