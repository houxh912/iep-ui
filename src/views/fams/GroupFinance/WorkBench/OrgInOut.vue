<template>
  <div class="total-wrapper">
    <iep-fams-card class="total-item-2" title="组织收支">
      <template slot="right">
        <el-radio-group v-model="type" size="small" @change="loadPage">
          <el-radio-button label="1">月</el-radio-button>
          <el-radio-button label="2">季</el-radio-button>
          <el-radio-button label="3">年</el-radio-button>
        </el-radio-group>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
        <el-table-column prop="actualIncome" label="实际收入">
        </el-table-column>
        <el-table-column prop="actualExpenditure" label="实际支出">
        </el-table-column>
        <el-table-column prop="budgetExpenditure" label="预算支出">
        </el-table-column>
      </el-table>
    </iep-fams-card>
    <iep-fams-card class="total-item-1" title="快捷入口">
      <iep-card-btn>
        <div @click="$openPage('/fams/group_finance/fund_fransfer')">资金调拨</div>
        <div @click="$openPage('/fams_spa/group_reward')">打赏/扣减(组织)</div>
        <div @click="$openPage('/fams_spa/group_reward_user')">打赏/扣减(个人)</div>
        <div>投资管理</div>
        <div @click="$openPage('/fams/group_finance/budget')">集团预算</div>
        <div @click="$openPage('/fams_spa/union_payment_plan')">回款计划</div>
        <div @click="$openPage('/app/data_assets?type=1')">组织资产</div>
        <div @click="$openPage('/fams_spa/iep_fee')">内网使用费</div>
      </iep-card-btn>
    </iep-fams-card>
  </div>
</template>
<script>
import { getOrgBudgetList } from '@/api/fams/statistics'
import IepFamsCard from './IepFamsCard'
import IepCardBtn from '@/views/fams/Components/CardBtn'
export default {
  components: { IepFamsCard, IepCardBtn },
  data () {
    return {
      type: '1',
      rangeTime: [],
      tableData: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getOrgBudgetList(this.type)
      this.tableData = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.total-wrapper {
  display: flex;
  .total-item-2 {
    flex: 2;
  }
  .total-item-1 {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
