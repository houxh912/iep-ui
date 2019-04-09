<template>
  <basic-container>
    <page-header title="收件箱" class="title" :data="subTitle" :replaceText="subTitleFn"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='alltabTemplate'" v-slot:alltabTemplate>
        <web-tab-tpl @readList="(val)=>{subTitle=val}"></web-tab-tpl>
      </template>
      <template v-if="tabName ==='InstrTabTemplate'" v-slot:InstrTabTemplate>
        <web-tab-tpl type="1" @readList="(val)=>{subTitle=val}"></web-tab-tpl>
      </template>
      <template v-if="tabName ==='shareTabTemplate'" v-slot:shareTabTemplate>
        <web-tab-tpl type="2" @readList="(val)=>{subTitle=val}"></web-tab-tpl>
      </template>
      <template v-if="tabName ==='wrongTabTemplate'" v-slot:wrongTabTemplate>
        <web-tab-tpl type="3" @readList="(val)=>{subTitle=val}"></web-tab-tpl>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import WebTabTpl from './tab'

export default {
  name: 'inbox',
  mixins: [ mixins ],
  components: { WebTabTpl },
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
      subTitle: [0, 0],
    }
  },
  methods: {
    subTitleFn (data) {
      return '（共有 ' + data[0] + ' 封邮件，其中未读邮件 ' + data[1] + ' 封）'
    },
  },
}
</script>

<style lang="scss" scoped>
.datum {
  padding: 20px;
  background-color: #fff;
}
</style>
