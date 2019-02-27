<template>
  <div>
    <basic-container>
      <page-header title="才人库" :replaceText="replaceText" :data="[10 ,5]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">

      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import IepTabs from './IepTabs'
export default {
  components: { PageHeader, IepTabs },
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
