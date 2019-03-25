<template>
  <div>
    <basic-container>
      <page-header title="人才库" :replaceText="replaceText" :data="[10 ,5]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='TalentPool'" v-slot:TalentPool>
          <talent-pool v-loading="activeTab !=='TalentPool'"></talent-pool>
        </template>
        <template v-if="activeTab ==='ResumeLibrary'" v-slot:ResumeLibrary>
          <resume-library v-loading="activeTab !=='ResumeLibrary'"></resume-library>
        </template>
        <template v-if="activeTab ==='ResumeBlacklist'" v-slot:ResumeBlacklist>
          <resume-blacklist v-loading="activeTab !=='ResumeBlacklist'"></resume-blacklist>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import TalentPool from './TalentPool/'
import ResumeLibrary from './ResumeLibrary/'
import ResumeBlacklist from './ResumeBlacklist/'
export default {
  components: { TalentPool, ResumeLibrary, ResumeBlacklist },
  data () {
    return {
      replaceText: (data) => `（本周新增${data[0]}条招聘信息，收到${data[1]}份简历）`,
      tabList: [{
        label: '人才库',
        value: 'TalentPool',
      }, {
        label: '简历库',
        value: 'ResumeLibrary',
      }, {
        label: '简历黑名单',
        value: 'ResumeBlacklist',
      }],
      activeTab: 'TalentPool',
    }
  },
}
</script>
