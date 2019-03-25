<template>
  <div>
    <basic-container>
      <page-header title="商机"></page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='allBusinessTab'" v-slot:allBusinessTab>
          <all-business-tab></all-business-tab>
        </template>
        <template v-if="tabName ==='myReleaseTab'" v-slot:myReleaseTab>
          <my-release-tab></my-release-tab>
        </template>
        <template v-if="tabName ==='myClaimTab'" v-slot:myClaimTab>
          <my-claim-tab></my-claim-tab>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import allBusinessTab from './AllBusiness/'
import myReleaseTab from './MyRelease/'
import myClaimTab from './MyClaim/'
import IepTabs from '@/components/IepCommon/Tabs'
export default {
  name: 'business',
  mixins: [mixins],
  components: { allBusinessTab, myReleaseTab, myClaimTab, IepTabs },
  data () {
    return {
      tabName: 'allBusinessTab',
      tabList: [
        {
          label: '全部商机',
          value: 'allBusinessTab',
        }, {
          label: '我发布的',
          value: 'myReleaseTab',
        }, {
          label: '我认领的',
          value: 'myClaimTab',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.business {
  padding: 20px 0;
  background-color: #fff;
}
</style>
