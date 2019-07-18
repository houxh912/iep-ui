<template>
  <div>
    <basic-container>
      <iep-page-header title="货币资金明细"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Company'" v-slot:Company>
          <company v-loading="activeTab !=='Company'"></company>
        </template>
        <template v-if="activeTab ==='BankAccount'" v-slot:BankAccount>
          <bank-account v-loading="activeTab !=='BankAccount'"></bank-account>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import BankAccount from './BankAccount/'
import Company from './Company/'
export default {
  components: { BankAccount, Company },
  data () {
    return {
      tabList: [{
        label: '公司',
        value: 'Company',
      }, {
        label: '银行账户',
        value: 'BankAccount',
      }],
      activeTab: 'Company',
    }
  },
}
</script>
