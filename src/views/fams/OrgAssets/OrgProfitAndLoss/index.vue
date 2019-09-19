<template>
  <div>
    <basic-container>
      <iep-page-header title="组织盈亏" :replaceText="replaceText" :data="statistics">
        <template slot="left">
          <iep-tip content="
            项目收入=项目收入+代收和项目相关的本组织代收（收入-支出）<br>
            内部收入=集团打赏组织+组织转账收入+组织扣减个人<br>
            费用=支出管理（除了员工提现、组织借款、银行提现、集团往来结算、非成本费用）+集团往来账（只取日常报销、项目报销、利息、代收、代缴、费用代缴、组织打赏（项目提成）、组织转账、集团扣减）<br>
            营业利润=合同金额-费用<br>
            净利润=项目收入+内部收入-费用<br>
          ">
          </iep-tip>
        </template>
      </iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="qichuzhi_edit" @click="handleQichizhi()">设置期初值</iep-button>
        </template>
        <template slot="right">
          <iep-date-picker size="small" v-model="yearDate" align="right" type="year" placeholder="选择年" @change="loadPage()"></iep-date-picker>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" show-summary>
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
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleFee(scope.row)">查看费用明细</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <qichuzhi-dialog ref="QichuzhiDialog" @load-page="loadPage"></qichuzhi-dialog>
    <fee-dialog-form ref="FeeDialogForm" @load-page="loadPage"></fee-dialog-form>
  </div>
</template>
<script>
import { getOrgProfits, getCostListByOrgId } from '@/api/fams/statistics'
import { getYear } from '@/util/date'
import { calculateSign } from '@/util/util'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { columnsMap } from './options.js'
import QichuzhiDialog from './QichuzhiDialog'
import FeeDialogForm from './FeeDialogForm'
export default {
  components: { QichuzhiDialog, FeeDialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      yearDate: new Date(),
      statistics: [0, 0],
      replaceText: (data) => `（${data[0]}年度${data[1]}组织盈亏）`,
      qichuzhi_edit: false,
    }
  },
  computed: {
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
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.qichuzhi_edit = this.permissions['qichuzhi_edit']
    this.statistics = [this.year, this.orgName]
    this.loadPage()
  },
  methods: {
    async handleFee (row) {
      const { data } = await getCostListByOrgId({ year: this.year, orgId: this.orgId, month: row.month })
      this.$refs['FeeDialogForm'].expenditureList = [...data.data.expenditureList, ...data.data.otherList]
      this.$refs['FeeDialogForm'].orgName = row.orgName
      this.$refs['FeeDialogForm'].date = `${this.year} - ${row.month}`
      this.$refs['FeeDialogForm'].dialogShow = true
    },
    calculateSign,
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
