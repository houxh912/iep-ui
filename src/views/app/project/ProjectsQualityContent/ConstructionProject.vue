<template>
  <div class="project">
    <IepAppTabsCard isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Construction'" v-slot:Construction>
          <construction v-loading="activeTab !=='Construction'"></construction>
        </template>
        <template v-if="activeTab ==='Built'" v-slot:Built>
          <built v-loading="activeTab !=='Built'"></built>
        </template>
        <template v-if="activeTab ==='finish'" v-slot:Built>
          <built v-loading="activeTab !=='finish'"></built>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Construction from './Construction'
import Built from './Built'
export default {
  components: {
    Built,
    Construction,
  },
  data () {
    return {
      tabList: [{
        label: '执行项目（4个)',
        value: 'Construction',
      }, {
        label: '待建项目（23个）',
        value: 'Built',
      }, {
        label: '完结项目（23个）',
        value: 'finish',
      }],
      activeTab: 'Construction',
    }
  },
}
</script>
<style lang="css" scoped>
.project >>> .el-card {
  height: 346px;
}
</style>
