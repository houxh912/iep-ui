<template>
  <div class="most">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Hottest'" v-slot:Hottest>
          <hottest v-loading="activeTab !=='Hottest'" ref="tpl"></hottest>
        </template>
        <template v-if="activeTab ==='Download'" v-slot:Download>
          <download v-loading="activeTab !=='Download'" ref="tpl"></download>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Hottest from './Hottest'
import Download from './Download'

export default {
  components: {
    Hottest,
    Download,
  },
  data () {
    return {
      tabList: [{
        label: '本周排行榜',
        value: 'Download',
      }, {
        label: '说说总数榜',
        value: 'Hottest',
      }],
      activeTab: 'Download',
      hotList: [],
      downloadList: [],
    }
  },
  methods: {
    loadData () {
      this.$refs['tpl'].loadData()
    },
  },
}
</script>
<style scoped>
.most >>> .el-card {
  height: 380px;
}
</style>