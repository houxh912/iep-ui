<template>
  <div class="project">
    <IepAppTabsCard isMore :linkName="linkName">
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
        label: '项目经理（0个)',
        value: 'ProjectManager',
      }, {
        label: '项目督导（0个）',
        value: 'ProjectExecutive',
      }],
      activeTab: 'ProjectManager',
      linkName: '/app/project_list',
    }
  },
}
</script>
<style lang="css" scoped>
.project >>> .el-card__body {
  height: 410px;
}
</style>
