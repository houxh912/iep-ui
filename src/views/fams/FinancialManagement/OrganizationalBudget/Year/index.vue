<template>
  <div v-loading.lock="fullscreenLoading">
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>{{budgetTime}}年度预算</span>
          <iep-button v-if="isAddThisYearBudget()" @click="handleAddBudget()">新增本年度预算</iep-button>
        </operation-wrapper>
      </template>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table :data="budgetTable" style="width: 100%" :height="tableHeight" show-summary :summary-method="getSummaries" @row-dblclick="handleDetail">
      <el-table-column prop="typeName" label="预算项">
      </el-table-column>
      <el-table-column :label="budgetTime + '年'">
        <el-table-column prop="budget" label="预算(元)">
          <template slot-scope="scope">
            <span>{{scope.row['budget'] | parseToMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际支出(元)">
          <template slot-scope="scope">
            <span>{{scope.row['actual'] | parseToMoney}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getSummaries } from '@/util/table'
import { getBudgetYearList, getBudgetQuarterList, getBudgetYearById, putBudgetYearRelation, postYearBudget } from '@/api/fams/budget'
import DialogForm from './DialogForm'
import { initForm } from './options'
export default {
  components: { DialogForm },
  data () {
    return {
      fullscreenLoading: false,
      budgetId: '',
      budgetTime: '',
      yearList: [],
      budgetTable: [],
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  created () {
    this.load()
  },
  methods: {
    getSummaries,
    isAddThisYearBudget () {
      if (this.yearList.length && this.budgetTime === new Date().getFullYear()) {
        return false
      } else {
        return true
      }
    },
    handleAddBudget () {
      const year = new Date().getFullYear()
      this.fullscreenLoading = true
      postYearBudget(year).then(() => {
        this.load()
        this.fullscreenLoading = false
      })
    },
    handleDetail (row) {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.id = this.budgetId
      this.$refs['DialogForm'].form.type = row.type
      this.$refs['DialogForm'].form.budget = row.budget
      this.$refs['DialogForm'].form.actual = row.actual
      this.$refs['DialogForm'].formRequestFn = putBudgetYearRelation
      this.$refs['DialogForm'].dialogShow = true
    },
    handleChange () {
      this.loadPage()
    },
    async load () {
      await this.loadYearList()
      await this.loadPage()
    },
    async loadYearList () {
      const { data } = await getBudgetYearList()
      this.yearList = data.data
      this.budgetId = this.yearList[0].budgetId
      this.budgetTime = this.yearList[0].budgetTime
      this.$emit('on-change-year', this.budgetId, this.yearList, this.budgetTime)
      const quarterList = (await getBudgetQuarterList(this.budgetId)).data.data
      this.$emit('on-change-quarter', quarterList, quarterList[0].budgetId)
    },
    loadPage () {
      getBudgetYearById(this.budgetId).then(({ data }) => {
        this.budgetTable = data.data.relation
      })
    },
  },
  watch: {
    budgetId (n) {
      this.$emit('on-change-year', n, this.yearList, this.budgetTime)
    },
  },
}
</script>



