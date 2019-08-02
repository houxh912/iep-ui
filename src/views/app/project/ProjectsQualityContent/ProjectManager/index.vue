<template>
  <div class="project">
    <IepAppTabsCard isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='ProjectManager'" v-slot:ProjectManager>
          <project-manager v-loading="activeTab !=='ProjectManager'"></project-manager>
        </template>
        <template v-if="activeTab ==='ProjectExecutive'" v-slot:ProjectExecutive>
          <project-executive v-loading="activeTab !=='ProjectExecutive'"></project-executive>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import ProjectManager from './ProjectManager'
import ProjectExecutive from './ProjectExecutive'
export default {
  components: {
    ProjectManager,
    ProjectExecutive,
  },
  data () {
    return {
      tabList: [{
        label: '项目经理（4个)',
        value: 'ProjectManager',
      }, {
        label: '项目督导（23个）',
        value: 'ProjectExecutive',
      }],
      activeTab: 'ProjectManager',
    }
  },
}
</script>
<style lang="css" scoped>
.project >>> .el-card {
  height: 346px;
}
</style>
