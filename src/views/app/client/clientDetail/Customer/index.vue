<template>
    <div class="gird-qualification">
        <div class="leaderBoard">
            <IepAppTabsCard :linkName="linkName">
            <iep-tabs v-model="activeTab" :tab-list="tabList">
                <template v-if="activeTab ==='Panorama'" v-slot:Panorama>
                  <panorama v-loading="activeTab !=='Panorama'"></panorama>
                </template>
            </iep-tabs>
            </IepAppTabsCard>
        </div>
    </div>
</template>
<script>
import Panorama from './Panorama'
export default {
  components: {
    Panorama,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '全部',
        value: 'Panorama',
      }],
      activeTab: 'Panorama',
    }
  },
}
</script>
<style scoped>
.gird-qualification >>> .el-card{
  border:none;
  padding:0;
}
</style>
