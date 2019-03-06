<template>
  <div class="count">
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='MyCustomTab'" v-slot:MyCustomTab>
        <my-custom-tab ref="myCustom"></my-custom-tab>
      </template>
      <template v-if="tabName ==='AllCustomTab'" v-slot:AllCustomTab>
        <all-custom-tab ref="allCustom"></all-custom-tab>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import IepTabs from '@/components/IepCommon/Tabs'
import MyCustomTab from './myCustom'
import AllCustomTab from './allCustom'
export default {
  name: 'count',
  components: { MyCustomTab, AllCustomTab, IepTabs },
  data () {
    return {
      tabName: 'MyCustomTab',
      tabList: [
        {
          label: '我的客户',
          value: 'MyCustomTab',
        }, {
          label: '全部客户',
          value: 'AllCustomTab',
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
.count {
  padding: 20px 0;
  background-color: #fff;
}
</style>
