<template>
  <basic-container>
    <page-header title="组织资产-舟山国脉研发中心"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='dataAssets'" v-slot:dataAssets>
        <dataAssets></dataAssets>
      </template>
      <template v-if="tabName ==='financialAssets'" v-slot:financialAssets>
        <dataAssets></dataAssets>
      </template>
      <template v-if="tabName ==='capabilityAssets'" v-slot:capabilityAssets>
        <dataAssets></dataAssets>
      </template>
      <template v-if="tabName ==='otherAssets'" v-slot:otherAssets>
        <dataAssets></dataAssets>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import dataAssets from './dataAssets'

export default {
  name: 'datum',
  components: { dataAssets },
  data () {
    return {
      tabName: 'materialDialog',
      tabList: [
        {
          label: '数据资产',
          value: 'dataAssets',
        }, {
          label: '财务资产',
          value: 'financialAssets',
        }, {
          label: '能力资产',
          value: 'capabilityAssets',
        }, {
          label: '其他资产',
          value: 'otherAssets',
        },
      ],
    }
  },
  created () {
    
  },
}
</script>
