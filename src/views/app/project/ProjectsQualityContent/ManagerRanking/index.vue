<template>
  <div class="project">
    <IepAppTabsCard :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='projectManager'" v-slot:projectManager>
          <projectManager v-loading="activeTab !=='projectManager'"></projectManager>
        </template>
        <template v-if="activeTab ==='supervisor'" v-slot:supervisor>
          <supervisor v-loading="activeTab !=='supervisor'"></supervisor>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import projectManager from './projectManager'
import supervisor from './supervisor'
export default {
  components: {
    projectManager,
    supervisor,
  },
  data () {
    return {
      tabList: [{
        label: '优秀项目经理',
        value: 'projectManager',
      }, {
        label: '督导达人',
        value: 'supervisor',
      }],
      activeTab: 'projectManager',
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
