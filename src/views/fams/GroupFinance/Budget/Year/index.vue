<template>
  <div>
    <operation-container>
      <template slot="left">
        <operation-wrapper>
          <span>{{year}}年度预算</span>
        </operation-wrapper>
      </template>
      <template slot="right">
        <iep-date-picker size="small" type="year" v-model="selectDate" @change="handleChange"></iep-date-picker>
      </template>
    </operation-container>
    <el-table :data="budgetTable" style="width: 100%" :height="tableHeight">
      <el-table-column prop="orgName" label="组织名称">
      </el-table-column>
      <el-table-column :label="year + '年'">
        <el-table-column prop="budget" label="预算(元)">
          <template slot-scope="scope">
            <span>{{scope.row['budgetTotal'] | parseToMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际(元)">
          <template slot-scope="scope">
            <span>{{scope.row['actualTotal'] | parseToMoney}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//show-summary :summary-method="getSummaries"
import { getYear } from '@/util/date'
import { parseToTimeSeconds } from '@/filters/'
import { getUnionYearByYear } from '@/api/fams/budget'
// import { getSummaries } from '@/util/table'
export default {
  data () {
    return {
      selectDate: parseToTimeSeconds(new Date),
      budgetTable: [],
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  computed: {
    year () {
      return getYear(this.selectDate)
    },
  },
  created () {
    this.load()
  },
  methods: {
    // getSummaries,
    handleChange () {
      this.loadPage()
    },
    async load () {
      await this.loadPage()
    },
    loadPage () {
      getUnionYearByYear(this.year).then(({ data }) => {
        this.budgetTable = data.data
      })
    },
  },
}
</script>



