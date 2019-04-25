<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Metting'" v-slot:Metting>
          <metting v-loading="activeTab !=='Metting'"></metting>
        </template>
        <template v-if="activeTab ==='Library'" v-slot:Library>
          <library v-loading="activeTab !=='Library'"></library>
        </template>
        <template v-if="activeTab ==='Activity'" v-slot:Activity>
          <activity v-loading="activeTab !=='Activity'"></activity>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Metting from './Metting'
import Library from './Library'
import Activity from './Activity'
export default {
  components: {
    Metting,
    Library,
    Activity,
  },
  data () {
    return {
      tabList: [{
        label: '品牌会议',
        value: 'Metting',
      }, {
        label: '估值活动',
        value: 'Activity',
      }, {
        label: '培训库',
        value: 'Library',
      }],
      activeTab: 'Metting',
    }
  },
}
</script>
<style scoped>
</style>

