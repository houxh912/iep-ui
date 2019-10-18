<template>
  <basic-container>
    <iep-page-header title="我的会议"></iep-page-header>
    <iep-tabs v-model="activeTab" :tab-list="tabList">
      <template v-if="activeTab ==='MyAllmeeting'" v-slot:MyAllmeeting>
        <my-allmeeting @load-page="loadPage" v-loading="activeTab !=='MyAllmeeting'" :record="record"></my-allmeeting>
      </template>
      <template v-if="activeTab ==='ConductMeeting'" v-slot:ConductMeeting>
        <conduct-meeting v-loading="activeTab !=='ConductMeeting'" @load-page="loadPage" :record="record"></conduct-meeting>
      </template>
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
import MyAllmeeting from './MyAllmeeting/index'
import ConductMeeting from './ConductMeeting/index'
import AuditedMeeting from './AuditedMeeting/index'
import DraftMeeting from './DraftMeeting/index'
import EndingMeeting from './EndingMeeting/index'
import NotpassMeeting from './NotpassMeeting/index'
export default {
  components: { MyAllmeeting, ConductMeeting, AuditedMeeting, DraftMeeting, EndingMeeting, NotpassMeeting },
  data () {
    return {
      tabList: [{
        label: '全部',
        value: 'MyAllmeeting',
      }, {
        label: '进行',
        value: 'ConductMeeting',
      }, {
        label: '待审核',
        value: 'AuditedMeeting',
      }, {
        label: '已结束',
        value: 'EndingMeeting',
      }, {
        label: '未通过',
        value: 'NotpassMeeting',
      }, {
        label: '草稿',
        value: 'DraftMeeting',
      }],
      activeTab: 'MyAllmeeting',
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