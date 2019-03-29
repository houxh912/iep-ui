<template>
  <basic-container>
      <page-header title="星标邮件" class="title"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='alltabTemplate'" v-slot:alltabTemplate>
        <web-tab-tpl></web-tab-tpl>
      </template>
      <template v-if="tabName ==='InstrTabTemplate'" v-slot:InstrTabTemplate>
        <web-tab-tpl type="1"></web-tab-tpl>
      </template>
      <template v-if="tabName ==='shareTabTemplate'" v-slot:shareTabTemplate>
        <web-tab-tpl type="2"></web-tab-tpl>
      </template>
      <template v-if="tabName ==='wrongTabTemplate'" v-slot:wrongTabTemplate>
        <web-tab-tpl type="3"></web-tab-tpl>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import IepTabs from '@/components/IepCommon/Tabs'
import WebTabTpl from './tab'

export default {
  name: 'inbox',
  mixins: [ mixins ],
  components: { IepTabs, WebTabTpl },
  data () {
    return {
      tabName: 'alltabTemplate',
      tabList: [
        {
          label: '全部',
          value: 'alltabTemplate',
        }, {
          label: '批示',
          value: 'InstrTabTemplate',
        }, {
          label: '分享',
          value: 'shareTabTemplate',
        }, {
          label: '纠错',
          value: 'wrongTabTemplate',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.datum {
  padding: 20px;
  background-color: #fff;
}
</style>
