<template>
  <div>
    <basic-container>
      <iep-page-header title="组织盈亏" :replaceText="replaceText" :data="statistics">
        <iep-tip content="项目收入=项目收入+代收和项目相关的本组织代收（收入-支出）<br/>
内部收入=集团打赏组织+组织转账收入<br/>
费用：支出管理（除了员工提现、组织借款、银行提现、集团往来结算、非成本费用）+【代缴、费用代缴、组织打赏（项目提成发放）】这几项是支出-收入+组织转账支出+集团扣减组织<br/>
营业利润=合同金额-费用<br/>
净利润=项目收入+内部收入-费用"></iep-tip>
      </iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="isQichizhi" @click="handleQichizhi()">设置期初值</iep-button>
        </template>
        <template slot="right">
          <iep-date-picker size="small" v-model="yearDate" align="right" type="year" placeholder="选择年" @change="loadPage()"></iep-date-picker>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary>
        <el-table-column prop="projectIncome" label="项目收入">
          <template slot-scope="scope">
            {{scope.row.projectIncome}}
            {{`${isQichizhi ? `(+${scope.row.projectInitialValue})` : ''}`}}
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用">
          <template slot-scope="scope">
            {{scope.row.cost}}
            {{`${isQichizhi ? `(+${scope.row.costInitialValue})` : ''}`}}
          </template>
        </el-table-column>
        <el-table-column prop="operatingProfit" label="营业利润">
          <template slot-scope="scope">
            {{scope.row.operatingProfit}}
            {{`${isQichizhi ? `(-${scope.row.costInitialValue})` : ''}`}}
          </template>
        </el-table-column>
        <el-table-column prop="netProfit" label="净利润">
          <template slot-scope="scope">
            {{scope.row.netProfit}}
            {{`${isQichizhi ? `(+${scope.row.projectInitialValue}) (-${scope.row.costInitialValue})` : ''}`}}
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <qichuzhi-dialog ref="QichuzhiDialog" @load-page="loadPage"></qichuzhi-dialog>
  </div>
</template>
<script>
import { getOrgProfits } from '@/api/fams/statistics'
import { getYear } from '@/util/date'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
import QichuzhiDialog from './QichuzhiDialog'
export default {
  components: { QichuzhiDialog },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      yearDate: new Date(),
      statistics: [0, 0],
      replaceText: (data) => `（${data[0]}年度${data[1]}组织盈亏）`,
    }
  },
  computed: {
    isQichizhi () {
      return [207, 1].includes(this.userInfo.userId)
    },
    year () {
      return getYear(this.yearDate)
    },
    orgId () {
      if (this.$route.query.orgId) {
        return +this.$route.query.orgId
      } else {
        return this.userInfo.orgId
      }
    },
    orgName () {
      if (this.$route.query.orgName) {
        return this.$route.query.orgName
      } else {
        return this.userInfo.orgName
      }
    },
    ...mapGetters(['userInfo']),
  },
  created () {
    this.statistics = [this.year, this.orgName]
    this.loadPage()
  },
  methods: {
    handleQichizhi () {
      this.$refs['QichuzhiDialog'].dialogShow = true
      this.$refs['QichuzhiDialog'].year = this.year
    },
    async loadPage () {
      this.isLoadTable = true
      const { data } = await getOrgProfits(this.orgId, this.year)
      this.pagedTable = data.data
      this.isLoadTable = false
    },
  },
}
</script>