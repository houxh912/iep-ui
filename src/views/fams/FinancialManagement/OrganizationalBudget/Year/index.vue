<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>{{budgetTime}}年度预算</div>
      </template>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table :data="budgetTable" style="width: 100%" show-summary @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      <el-table-column prop="typeName" label="预算项">
      </el-table-column>
      <el-table-column :label="budgetTime + '年'">
        <el-table-column prop="budget" label="预算">
          <template slot-scope="scope">
            <span>{{scope.row['budget']}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际">
          <template slot-scope="scope">
            <span>{{scope.row['actual']}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getBudgetYearList, getBudgetYearById, putBudgetYearRelation } from '@/api/fams/budget'
import DialogForm from './DialogForm'
import { initForm } from './options'
import mixins from '@/mixins/mixins'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      budgetId: '',
      budgetTime: '',
      yearList: [],
      budgetTable: [],
    }
  },
  async created () {
    await this.loadYearList()
    await this.loadPage()
  },
  methods: {
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
    async loadYearList () {
      const { data } = await getBudgetYearList()
      this.yearList = data.data
      this.budgetId = this.yearList[0].budgetId
      this.budgetTime = this.yearList[0].budgetTime
    },
    loadPage () {
      getBudgetYearById(this.budgetId).then(({ data }) => {
        this.budgetTable = data.data.relation
      })
    },
  },
  watch: {
    budgetId (n) {
      this.$emit('on-change-year', n)
    },
  },
}
</script>



