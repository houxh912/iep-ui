<template>
  <div class="crms">
    <page-header title="客户"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='allCustomTab'" v-slot:allCustomTab>
        <all-custom-tab></all-custom-tab>
      </template>
      <template v-if="tabName ==='myCustomTab'" v-slot:myCustomTab>
        <my-custom-tab></my-custom-tab>
      </template>
      <template v-if="tabName ==='cooperationTab'" v-slot:cooperationTab>
        <cooperation-tab></cooperation-tab>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import allCustomTab from './allCustom'
import myCustomTab from './myCustom'
import cooperationTab from './cooperation'
import IepTabs from '@/components/IepCommon/Tabs'

export default {
  name: 'Demand',
  mixins: [mixins],
  components: { allCustomTab, myCustomTab, cooperationTab, IepTabs },
  data () {
    return {
      tabName: 'allCustomTab',
      tabList: [
        {
          label: '全部客户',
          value: 'allCustomTab',
        }, {
          label: '我的客户',
          value: 'myCustomTab',
        }, {
          label: '协作客户',
          value: 'cooperationTab',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.crms {
  padding: 20px 0;
  background-color: #fff;
}
</style>
