<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='News'" v-slot:News>
          <news v-loading="activeTab !=='News'"></news>
        </template>
        <template v-if="activeTab ==='System'" v-slot:System>
          <system v-loading="activeTab !=='System'"></system>
        </template>
        <template v-if="activeTab ==='Task'" v-slot:Task>
          <task v-loading="activeTab !=='Task'"></task>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import News from './News'
import System from './System'
import Task from './Task'
export default {
  components: {
    News,
    System,
    Task,
  },
  data () {
    return {
      tabList: [{
        label: '要闻',
        value: 'News',
      }, {
        label: '制度',
        value: 'System',
      }, {
        label: '悬赏任务',
        value: 'Task',
      }],
      activeTab: 'News',
    }
  },
}
</script>
<style scoped>
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
</style>

