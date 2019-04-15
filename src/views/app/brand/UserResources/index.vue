<template>
  <div class="grid-content">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='User'" v-slot:User>
          <user v-loading="activeTab !=='User'"></user>
        </template>
        <template v-if="activeTab ==='Media'" v-slot:Media>
          <media v-loading="activeTab !=='Media'"></media>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import User from './User'
import Media from './Media'
export default {
  components: {
    User,
    Media,
  },
  data () {
    return {
      tabList: [{
        label: '用户资源',
        value: 'User',
      }, {
        label: '媒体资源',
        value: 'Media',
      }],
      activeTab: 'User',
    }
  },
}
</script>
<style scoped>
.iep-tabs >>> .el-tabs__nav-scroll {
  padding: 24px 20px 0 20px;
}
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 16px 20px;
}
</style>

