<template>
    <div class="gird-qualification">
        <div class="leaderBoard">
            <IepAppTabsCard :linkName="linkName">
            <iep-tabs v-model="activeTab" :tab-list="tabList">
                <template v-if="activeTab ==='Whole'" v-slot:Whole>
                  <whole v-loading="activeTab !=='Whole'"></whole>
                </template>
                <template v-if="activeTab ==='Trademark'" v-slot:Trademark>
                  <trademark v-loading="activeTab !=='Trademark'"></trademark>
                </template>
                <template v-if="activeTab ==='Certificate'" v-slot:Certificate>
                  <certificate v-loading="activeTab !=='Certificate'"></certificate>
                </template>
                <template v-if="activeTab ==='SoftwareCopyright'" v-slot:SoftwareCopyright>
                  <software-copyright v-loading="activeTab !=='SoftwareCopyright'"></software-copyright>
                </template>
                <template v-if="activeTab ==='SoftwarePatents'" v-slot:SoftwarePatents>
                  <software-patents v-loading="activeTab !=='SoftwarePatents'"></software-patents>
                </template>
            </iep-tabs>
            </IepAppTabsCard>
        </div>
    </div>
</template>
<script>
import Whole from './Whole'
import Trademark from './Trademark'
import Certificate from './Certificate'
import SoftwareCopyright from './SoftwareCopyright'
import SoftwarePatents from './SoftwarePatents'
export default {
  components: {
    Whole,
    Trademark,
    Certificate,
    SoftwareCopyright,
    SoftwarePatents,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '全部',
        value: 'Whole',
      }, {
        label: '证书',
        value: 'Trademark',
      }, {
        label: '商标',
        value: 'Certificate',
      }, {
        label: '软件著作权',
        value: 'SoftwareCopyright',
      }, {
        label: '软件专利',
        value: 'SoftwarePatents',
      }],
      activeTab: 'Whole',
    }
  },
}
</script>
<style scoped lang="scss">
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-qualification {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
    .leaderBoard{
      grid-column-start: 1;
      grid-column-end: 4;
    }
}
</style>
<style scoped>
.gird-qualification >>> .el-card{
  border:none;
  padding:0;
}
</style>
