<template>
  <div>
    <basic-container>
      <page-header title="领导指示"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Entire'" v-slot:Entire>
          <entire v-loading="activeTab !=='Entire'"></entire>
        </template>
        <template v-if="activeTab ==='Unread'" v-slot:Unread>
          <unread v-loading="activeTab !=='Unread'"></unread>
        </template>
        <template v-if="activeTab ==='SendOut'" v-slot:SendOut>
          <send-out v-loading="activeTab !=='SendOut'"></send-out>
        </template>
        <template v-if="activeTab ==='MarkIt'" v-slot:MarkIt>
          <mark-it v-loading="activeTab !=='MarkIt'"></mark-it>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import IepTabs from '@/components/IepCommon/Tabs'
import Entire from './Entire/'
import Unread from './Unread/'
import SendOut from './SendOut/'
import MarkIt from './MarkIt/'
export default {
  components: { PageHeader, IepTabs, Entire, Unread, SendOut, MarkIt },
  data () {
    return {
      tabList: [
        {
          label: '全部（88）',
          value: 'Entire',
        },
        {
          label: '未读（28）',
          value: 'Unread',
        },
        {
          label: '我发出的（18）',
          value: 'SendOut',
        },
        {
          label: '我标记的（42）',
          value: 'MarkIt',
        },
      ],
      activeTab: 'Entire',
    }
  },
}
</script>
