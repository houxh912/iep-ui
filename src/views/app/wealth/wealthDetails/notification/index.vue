<template>
  <div class="resources">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Rules'" v-slot:Rules>
          <rules v-loading="activeTab !=='Rules'"></rules>
        </template>
        <template v-if="activeTab ==='Management'" v-slot:Management>
          <management v-loading="activeTab !=='Management'"></management>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Rules from './Rules'
import Management from './Management'
export default {
  components: {
    Rules,
    Management,
  },
  data () {
    return {
      tabList: [{
        label: '风险与规则',
        value: 'Rules',
      }, {
        label: '管理办法',
        value: 'Management',
      }],
      activeTab: 'Rules',
    }
  },
}
</script>
<style scoped>
</style>

