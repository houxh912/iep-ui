<template>
  <div class="most">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Hottest'" v-slot:Hottest>
          <hottest v-loading="activeTab !=='Hottest'"></hottest>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Hottest from './Hottest'

export default {
  components: {
    Hottest,
  },
  data () {
    return {
      tabList: [{
        label: '热门项目',
        value: 'Hottest',
      }],
      activeTab: 'Hottest',
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card {
  border: 0;
  padding: 0 !important;
}
</style>