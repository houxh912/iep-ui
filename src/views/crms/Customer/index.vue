<template>
  <div>
    <basic-container>
      <page-header title="客户"></page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='AllCustomerTab'" v-slot:AllCustomerTab>
          <all-customer-tab></all-customer-tab>
        </template>
        <template v-if="tabName ==='MyCustomerTab'" v-slot:MyCustomerTab>
          <my-customer-tab></my-customer-tab>
        </template>
        <template v-if="tabName ==='CooperationCustomerTab'" v-slot:CooperationCustomerTab>
          <cooperation-customer-tab></cooperation-customer-tab>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import AllCustomerTab from './AllCustomer/'
import MyCustomerTab from './MyCustomer/'
import CooperationCustomerTab from './CooperationCustomer/'
import IepTabs from '@/components/IepCommon/Tabs'

export default {
  name: 'Demand',
  mixins: [mixins],
  components: { AllCustomerTab, MyCustomerTab, CooperationCustomerTab, IepTabs },
  data () {
    return {
      tabName: 'AllCustomerTab',
      tabList: [
        {
          label: '全部客户',
          value: 'AllCustomerTab',
        }, {
          label: '我的客户',
          value: 'MyCustomerTab',
        }, {
          label: '协作客户',
          value: 'CooperationCustomerTab',
        },
      ],
    }
  },
}
</script>