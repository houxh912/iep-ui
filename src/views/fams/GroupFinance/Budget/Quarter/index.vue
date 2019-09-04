<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>{{year}}季度预算</div>
      </template>
      <template slot="right">
        <operation-wrapper>
          <iep-date-picker size="small" type="year" v-model="selectDate" @change="handleChange"></iep-date-picker>
        </operation-wrapper>
      </template>
    </operation-container>
    <el-table v-loading="loading" :data="budgetTable" style="width: 100%" :height="tableHeight">
      <el-table-column prop="orgName" label="组织名称">
      </el-table-column>
      <el-table-column v-for="(item,idx) in budgetTableRelation" :key="idx" :label="getLabel(item)">
        <el-table-column prop="totalBudget" label="预算(元)">
          <template slot-scope="scope">
            <div>{{getValue(idx, scope, 'totalBudget') | parseToMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actualTotal" label="实际(元)">
          <template slot-scope="scope">
            <div>{{getValue(idx, scope, 'actualTotal') | parseToMoney}}</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// show-summary :summary-method="getSummaries"
import { getYear } from '@/util/date'
import { parseToTimeSeconds } from '@/filters/'
// import { getSummariesUnionBudget } from '@/util/table'
import { getUnionQuatorByYear } from '@/api/fams/budget'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
export default {
  mixins: [mixins],
  data () {
    return {
      loading: false,
      selectDate: parseToTimeSeconds(new Date),
      budgetTableRelation: [],
      budgetTable: [],
      budgetMap: {},
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  computed: {
    year () {
      return getYear(this.selectDate)
    },
    // getSummaries () {
    //   return getSummariesUnionBudget(this.budgetTable)
    // },
  },
  created () {
    this.loadPage()
  },
  methods: {
    getLabel (item) {
      return item.flag ? this.year + '年度' : item.budgetTime + '季度'
    },
    getValue (idx, scope, tName) {
      return scope.row.orgRelation[idx][tName]
    },
    handleChange () {
      this.loadPage()
    },
    async loadPage () {
      this.loading = true
      const { data } = await getUnionQuatorByYear(this.year)
      this.budgetTable = data.data
      this.budgetTableRelation = this.budgetTable[0].orgRelation
      this.budgetMap = keyBy(this.budgetTableRelation, 'budgetId')
      this.loading = false
    },
  },
}
</script>



