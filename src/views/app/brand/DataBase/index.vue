<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='DataPool'" v-slot:DataPool>
          <data-pool v-loading="activeTab !=='DataPool'"></data-pool>
        </template>
        <template v-if="activeTab ==='Propaganda'" v-slot:Propaganda>
          <propaganda v-loading="activeTab !=='Propaganda'"></propaganda>
        </template>
        <template v-if="activeTab ==='Modular'" v-slot:Modular>
          <modular v-loading="activeTab !=='Modular'"></modular>
        </template>
        <template v-if="activeTab ==='Sport'" v-slot:Sport>
          <sport v-loading="activeTab !=='Sport'"></sport>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import DataPool from './DataPool'
import Propaganda from './Propaganda'
import Modular from './Modular'
import Sport from './Sport'
export default {
  components: {
    DataPool,
    Propaganda,
    Modular,
    Sport,
  },
  data () {
    return {
      tabList: [{
        label: '资料库',
        value: 'DataPool',
      }, {
        label: '宣传',
        value: 'Propaganda',
      }, {
        label: '模块',
        value: 'Modular',
      }, {
        label: '活动',
        value: 'Sport',
      }],
      activeTab: 'DataPool',
    }
  },
}
</script>
<style scoped>
</style>

