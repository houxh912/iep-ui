<template>
  <basic-container>
    <iep-page-header title="会议审核"></iep-page-header>
    <iep-tabs v-model="activeTab" :tab-list="tabList">
      <template v-if="activeTab ==='AuditedMeeting'" v-slot:AuditedMeeting>
        <audited-meeting @load-page="loadPage" v-loading="activeTab !=='AuditedMeeting'" :record="record"></audited-meeting>
      </template>
      <template v-if="activeTab ==='AuditPass'" v-slot:AuditPass>
        <audit-pass @load-page="loadPage" v-loading="activeTab !=='AuditPass'" :record="record"></audit-pass>
      </template>
      <template v-if="activeTab ==='AuditNotpass'" v-slot:AuditNotpass>
        <audit-notpass @load-page="loadPage" v-loading="activeTab !=='AuditNotpass'" :record="record"></audit-notpass>
      </template>
    </iep-tabs>
  </basic-container>
</template>
<script>
import AuditNotpass from './AuditNotpass/index'
import AuditedMeeting from './AuditedMeeting/index'
import AuditPass from './AuditPass/index'
export default {
  components: { AuditNotpass, AuditPass, AuditedMeeting },
  data () {
    return {
      tabList: [
        {
          label: '待我审核',
          value: 'AuditedMeeting',
        },
        {
          label: '审核通过',
          value: 'AuditPass',
        },
        {
          label: '审核未通过',
          value: 'AuditNotpass',
        },
      ],
      activeTab: 'AuditedMeeting',
      record: {},
    }
  },
  methods: {
    loadPage () {

    },
  },
}
</script>