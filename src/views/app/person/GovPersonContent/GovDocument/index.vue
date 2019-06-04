<template>
  <div class="document">
    <IepAppTabsCard isMore linkName="/app/resource/material">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='NewPeople'" v-slot:NewPeople>
          <new-people v-loading="activeTab !=='NewPeople'"></new-people>
        </template>
        <template v-if="activeTab ==='documents'" v-slot:documents>
          <documents v-loading="activeTab !=='documents'"></documents>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import NewPeople from './NewPeople'
import documents from './documents'
export default {
  components: {
    NewPeople,
    documents,
  },
  data () {
    return {
      tabList: [{
        label: '新人必读',
        value: 'NewPeople',
      }, {
        label: '制度文件',
        value: 'documents',
      }],
      activeTab: 'NewPeople',
    }
  },
}
</script>

<style scoped>
.document >>> .el-card__body {
  height: 434px;
}
</style>
