<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>年度预算</div>
      </template>
      <template slot="right">
        <el-select v-model="yearId" placeholder="请选择年份" size="small">
          <el-option v-for="item in yearList" :key="item.yearBudgetId" :label="item.budgetYear" :value="item.yearBudgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="budgetItem" label="预算项">
        </el-table-column>
        <el-table-column label="2018">
          <el-table-column prop="budget" label="预算">
          </el-table-column>
          <el-table-column prop="actual" label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="2019">
          <el-table-column prop="budget" label="预算">
          </el-table-column>
          <el-table-column prop="actual" label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="2020">
          <el-table-column prop="budget" label="预算">
          </el-table-column>
          <el-table-column prop="actual" label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="2021">
          <el-table-column prop="budget" label="预算">
          </el-table-column>
          <el-table-column prop="actual" label="实际">
          </el-table-column>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getBudgetYearList, getBudgetYearById } from '@/api/fams/budget'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      yearList: [],
      tableData: [{
        budgetItem: '办公房租',
        budget: '1',
        actual: '2',
      }, {
        budgetItem: '人工成本',
        budget: '3',
        actual: '4',
      }, {
        budgetItem: '员工福利',
        budget: '5',
        actual: '6',
      }, {
        budgetItem: '办公费用',
        budget: '7',
        actual: '8',
      }, {
        budgetItem: '公司车辆费用',
        budget: '9',
        actual: '0',
      }, {
        budgetItem: '合计',
        budget: '11',
        actual: '12',
      }],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getBudgetYearList().then(({ data }) => {
        const date = new Date()
        console.log(date.getYear())
        this.yearList = data.data
        getBudgetYearById()
      })
    },
  },
}
</script>



