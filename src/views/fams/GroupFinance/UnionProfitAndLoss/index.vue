<template>
  <div>
    <basic-container>
      <iep-page-header title="集团盈亏">
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
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Year'" v-slot:Year>
          <year v-loading="activeTab !=='Year'"></year>
        </template>
        <template v-if="activeTab ==='Month'" v-slot:Month>
          <month v-loading="activeTab !=='Month'"></month>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import Month from './Month/'
import Year from './Year/'
export default {
  components: { Month, Year },
  data () {
    return {
      tabList: [{
        label: '年度',
        value: 'Year',
      }, {
        label: '月度',
        value: 'Month',
      }],
      activeTab: 'Year',
    }
  },
}
</script>
