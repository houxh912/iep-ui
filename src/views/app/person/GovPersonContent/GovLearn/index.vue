<template>
  <div class="GovLearn">
    <IepAppTabsCard isMore linkName="/app/resource/material">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='GovLearn'" v-slot:GovLearn>
          <gov-learn v-loading="activeTab !=='GovLearn'"></gov-learn>
        </template>
        <!-- <template v-if="activeTab ==='leadership'" v-slot:leadership>
          <leadership v-loading="activeTab !=='leadership'"></leadership>
        </template> -->
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import GovLearn from './GovLearn'
// import leadership from './leadership'
export default {
  components: {
    GovLearn,
    // leadership,
  },
  data () {
    return {
      tabList: [{
        label: '学习资源',
        value: 'GovLearn',
      }],
      activeTab: 'GovLearn',
    }
  },
}
</script>

<style scoped>
.GovLearn >>> .el-card {
  height: 374px;
}
</style>
