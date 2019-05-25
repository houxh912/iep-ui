<template>
  <div class="year">
    <operation-container>
      <template slot="right">
        <el-select v-model="budgetId" placeholder="请选择年份" size="small">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select>
      </template>
    </operation-container>
    <el-table v-loading="false" :data="budgetTableRelation" style="width: 100%" show-summary :summary-method="getSummaries">
      <el-table-column prop="number" label="序号">
      </el-table-column>
      <el-table-column prop="subjects" label="财务科目">
      </el-table-column>
      <el-table-column label="金额（元）">
        <el-table-column prop="actual" label="实际">
        </el-table-column>
        <el-table-column prop="Eetimate" label="预计">
        </el-table-column>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { getSummaries } from '@/util/table'
export default {
  data () {
    return {
      budgetId: '',
      budgetTime: '',
      yearList: [],
      budgetTableRelation: [{
        number: '1',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }, {
        number: '2',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }, {
        number: '3',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }, {
        number: '4',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }, {
        number: '5',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }, {
        number: '6',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }, {
        number: '7',
        subjects: '办公房租',
        actual: '11111',
        Eetimate: '3333',
      }],
    }
  },
  created () {
  },
  methods: {
    getSummaries,
  },
}
</script>
<style scoped>
.year >>> .el-table .cell {
  text-align: center;
}
</style>



