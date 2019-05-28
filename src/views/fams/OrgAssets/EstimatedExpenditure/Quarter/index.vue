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
            <div>{{getValue(item, scope, 'budget') | parseToMoney}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actual" label="实际(元)">
          <template slot-scope="scope">
            <div>{{getValue(item, scope, 'actual') | parseToMoney}}</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getSummaries } from '@/util/table'
import { getBudgetQuarterDetail } from '@/api/fams/budget'
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
  created () {
    this.loadPage()
  },
  methods: {
    getLabel (item) {
      return item.flag ? item.time + '年度' : item.time + '季度'
    },
    getSummaries,
    getValue (item, scope, tName) {
      return this.budgetMap[item.id].relation[scope.$index][tName]
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



