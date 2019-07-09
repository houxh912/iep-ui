<template>
  <div>
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>{{budgetTime}}年度预算</span>
          <!-- <iep-button @click="handleAddBudget()">新增本年度预算</iep-button> -->
        </operation-wrapper>
      </template>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table :data="budgetTable" style="width: 100%" :height="tableHeight" show-summary :summary-method="getSummaries">
      <el-table-column prop="typeName" label="预算项">
      </el-table-column>
      <el-table-column :label="budgetTime + '年'">
        <el-table-column prop="budget" label="预算(元)">
          <template slot-scope="scope">
            <span>{{scope.row['budget'] | parseToMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际(元)">
          <template slot-scope="scope">
            <span>{{scope.row['actual'] | parseToMoney}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getSummaries } from '@/util/table'
import { getBudgetYearList, getBudgetQuarterList, getBudgetYearById } from '@/api/fams/budget'
export default {
  data () {
    return {
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



