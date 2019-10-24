<template>
  <div class="GovLearn">
    <IepAppTabsCard isMore linkName="/app/resource/material">
      <el-button class="btn right" slot="left" type="text" @click="getMore">新人必读</el-button>
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
  methods: {
    getMore () {
      this.$router.push('/app/newComers')
    },
  },
}
</script>

<style scoped>
.GovLearn >>> .el-card {
  height: 374px;
}
.right {
  position: absolute;
  top: 0px;
  right: 70px;
  line-height: 59px;
  padding: 0;
  color: #cb3737;
  z-index: 3;
  transition: all 0.5s;
}
.right:hover {
  opacity: 0.7;
}
</style>
