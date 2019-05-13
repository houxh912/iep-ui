<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>年度预算</div>
      </template>
      <template slot="right">
        <el-select v-model="yearBudgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.yearBudgetId" :label="item.budgetYear+'年'" :value="item.yearBudgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <template>
      <el-table :data="budgetTable" style="width: 100%" show-summary>
        <el-table-column prop="typeName" label="预算项">
        </el-table-column>
        <el-table-column :label="budgetYear + '年'">
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
    </template>
  </div>
</template>
<script>
import { getBudgetYearList, getBudgetYearById } from '@/api/fams/budget'
import { columnsMap } from './options'
export default {
  data () {
    return {
      columnsMap,
      yearBudgetId: '',
      budgetYear: '',
      yearList: [],
      budgetTable: [],
    }
  },
  async created () {
    await this.loadYearList()
    await this.loadPage()
  },
  methods: {
    handleChange () {
      this.loadPage()
    },
    async loadYearList () {
      const { data } = await getBudgetYearList()
      this.yearList = data.data
      this.yearBudgetId = this.yearList[0].yearBudgetId
      this.budgetYear = this.yearList[0].budgetYear
    },
    loadPage () {
      getBudgetYearById(this.yearBudgetId).then(({ data }) => {
        this.budgetTable = data.data.relation
      })
    },
  },
}
</script>



