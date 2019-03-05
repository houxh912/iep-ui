<template>
  <div class="contract">
    <page-header title="合同"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='allContractTab'" v-slot:allContractTab>
        <all-contract-tab></all-contract-tab>
      </template>
      <template v-if="tabName ==='myContractTab'" v-slot:myContractTab>
        <my-contract-tab></my-contract-tab>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import allContractTab from './allContract'
import myContractTab from './myContract'
import IepTabs from '@/components/IepCommon/Tabs'
export default {
  name: 'contract',
  components: { allContractTab, myContractTab, IepTabs },
  mixins: [ mixins ],
  data () {
    return {
      tabName: 'allContractTab',
      tabList: [
        {
          label: '全部合同',
          value: 'allContractTab',
        }, {
          label: '我的合同',
          value: 'myContractTab',
        },
      ],
    }
  },
  methods: {
    change () {},
  },
}
</script>

<style lang="scss" scoped>
.contract {
  padding: 20px;
  background-color: #fff;
}
</style>
