<template>
  <div>
    <operation-container>
      <template slot="right">
        <iep-date-picker size="small" v-model="yearDate" align="right" type="year" placeholder="选择年" @change="loadPage()" :clearable="false"></iep-date-picker>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle" :summary-method="getSummary2" show-summary>
      <el-table-column prop="projectIncome" label="项目收入">
        <template slot-scope="scope">
          {{scope.row.projectIncome}}
          {{`${qichuzhi_edit ? `(${calculateSign(scope.row.projectInitialValue)})` : ''}`}}
        </template>
      </el-table-column>
      <el-table-column prop="internalRevenue" label="内部收入">
        <template slot-scope="scope">
          {{scope.row.internalRevenue}}
          {{`${qichuzhi_edit ? `(${calculateSign(scope.row.internalInitialValue)})` : ''}`}}
        </template>
      </el-table-column>
      <el-table-column prop="cost" label="费用">
        <template slot-scope="scope">
          {{scope.row.cost}}
          {{`${qichuzhi_edit ? `(${calculateSign(scope.row.costInitialValue)})` : ''}`}}
        </template>
      </el-table-column>
      <el-table-column prop="operatingProfit" label="营业利润">
        <template slot-scope="scope">
          {{scope.row.operatingProfit}}
          {{`${qichuzhi_edit ? `(${calculateSign(scope.row.costInitialValue, false)})` : ''}`}}
        </template>
      </el-table-column>
      <el-table-column prop="netProfit" label="净利润">
        <template slot-scope="scope">
          {{scope.row.netProfit}}
          {{`${qichuzhi_edit ? `(${calculateSign(scope.row.projectInitialValue)}) (${calculateSign(scope.row.costInitialValue, false)})` : ''}`}}
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUnionProfits } from '@/api/fams/statistics'
import { getYear } from '@/util/date'
import { getSummary2 } from '@/util/table'
import { calculateSign } from '@/util/util'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      yearDate: new Date(),
      statistics: [0, 0],
      replaceText: (data) => `（${data[0]}年度集团盈亏）`,
      qichuzhi_edit: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
    year () {
      if (this.yearDate) {
        return getYear(this.yearDate)
      } else {
        return ''
      }
    },
  },
  created () {
    this.qichuzhi_edit = this.permissions['qichuzhi_edit']
    this.statistics = [this.year]
    this.loadPage()
  },
  methods: {
    calculateSign,
    getSummary2,
    handleDetail (row) {
      this.$openPage(`/fams/org_assets/org_profit_and_loss?orgId=${row.id}&orgName=${row.orgName}`)
    },
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getUnionProfits(this.year, null)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>
