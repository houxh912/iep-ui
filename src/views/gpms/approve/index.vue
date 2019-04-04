<template>
  <div>
    <basic-container>
      <div v-if="pageState == 'list'">
        <page-header title="我的审批" :data="[16]"></page-header>
        <iep-tabs v-model="tabName" :tab-list="tabList">
          <template v-if="tabName ==='allTab'" v-slot:allTab>
            <tablePage ref="page" :status="'0'" @approve="handleApprove"></tablePage>
          </template>
          <template v-if="tabName ==='PendingTab'" v-slot:PendingTab>
            <tablePage ref="page" :status="'2'" @approve="handleApprove"></tablePage>
          </template>
          <template v-if="tabName ==='approvalTab'" v-slot:approvalTab>
            <tablePage ref="page" :status="'3'"></tablePage>
          </template>
          <template v-if="tabName ==='failureTab'" v-slot:failureTab>
            <tablePage ref="page" :status="'4'"></tablePage>
          </template>
        </iep-tabs>
      </div>
      <div v-if="pageState == 'approve'">
        <approvePage :form="formData" @close="pageState = 'list'"></approvePage>
      </div>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import tablePage from './tablePage/'
import approvePage from './approvePage/'
import { getDataDetail } from '@/api/gpms/index'

export default {
  mixins: [mixins],
  name: 'index',
  components: { tablePage, approvePage },
  data () {
    return {
      tabName: 'allTab',
      tabList: [
        {
          label: '全部',
          value: 'allTab',
        }, {
          label: '待审批',
          value: 'PendingTab',
        }, {
          label: '审批通过',
          value: 'approvalTab',
        }, {
          label: '审批不通过',
          value: 'failureTab',
        },
      ],
      pageState: 'list',
      formData: {},
    }
  },
  methods: {
    handleApprove (row) {
      getDataDetail(row.id).then(({data}) => {
        this.formData = data.data
        this.pageState = 'approve'
      })
    },
  },
}
</script>

<style scoped>
</style>