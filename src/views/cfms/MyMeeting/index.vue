<template>
  <basic-container>
    <iep-page-header title="我的会议"></iep-page-header>
    <iep-tabs v-model="activeTab" :tab-list="tabList">
      <template v-if="activeTab ==='AuditedMeeting'" v-slot:AuditedMeeting>
        <audited-meeting v-loading="activeTab !=='AuditedMeeting'" @load-page="loadPage" :record="record"></audited-meeting>
      </template>
      <template v-if="activeTab ==='EndingMeeting'" v-slot:EndingMeeting>
        <ending-meeting v-loading="activeTab !=='EndingMeeting'" @load-page="loadPage" :record="record"></ending-meeting>
      </template>
      <template v-if="activeTab ==='NotpassMeeting'" v-slot:NotpassMeeting>
        <notpass-meeting v-loading="activeTab !=='NotpassMeeting'" @load-page="loadPage" :record="record"></notpass-meeting>
      </template>
      <template v-if="activeTab ==='DraftMeeting'" v-slot:DraftMeeting>
        <draft-meeting v-loading="activeTab !=='DraftMeeting'" @load-page="loadPage" :record="record"></draft-meeting>
      </template>
    </iep-tabs>
  </basic-container>
</template>
<script>
import AuditedMeeting from './AuditedMeeting/index'
import DraftMeeting from './DraftMeeting/index'
import EndingMeeting from './EndingMeeting/index'
import NotpassMeeting from './NotpassMeeting/index'
export default {
  components: { AuditedMeeting, DraftMeeting, EndingMeeting, NotpassMeeting },
  data () {
    return {
      tabList: [
        {
          label: '已发布',
          value: 'EndingMeeting',
        },
        {
          label: '草稿箱',
          value: 'DraftMeeting',
        },
        {
          label: '待审核',
          value: 'AuditedMeeting',
        },
        {
          label: '未通过',
          value: 'NotpassMeeting',
        },
      ],
      activeTab: 'EndingMeeting',
      record: {},
    }
  },
  created () {
    // this.loadPage()
  },
  methods: {
    loadPage () {

    },
  },
}
</script>