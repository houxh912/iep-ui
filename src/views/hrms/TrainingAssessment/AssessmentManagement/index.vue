<template>
  <div>
    <basic-container>
      <iep-page-header title="绩效考核" :replaceText="replaceText" :data="[120]"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='AssessManagement'" v-slot:AssessManagement>
          <assess-management v-loading="activeTab !=='AssessManagement'"></assess-management>
        </template>
        <template v-if="activeTab ==='AssessModule'" v-slot:AssessModule>
          <assess-module v-loading="activeTab !=='AssessModule'"></assess-module>
        </template>
        <template v-if="activeTab ==='WaitingTab'" v-slot:WaitingTab>
          <waiting-tab v-loading="activeTab !=='WaitingTab'"></waiting-tab>
        </template>
        <template v-if="activeTab ==='SelfTab'" v-slot:SelfTab>
          <self-tab v-loading="activeTab !=='SelfTab'"></self-tab>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import AssessManagement from './AssessManagement/'
import AssessModule from './AssessModule/'
import WaitingTab from './ExaminationTab/WaitingTab'
import SelfTab from './ExaminationTab/SelfTab'

export default {
components: { AssessManagement, AssessModule, WaitingTab, SelfTab },
  data () {
    return {
      replaceText: (data) => `（共有${data[0]}条绩效考核记录）`,
      tabList: [{
        label: '考核管理',
        value: 'AssessManagement',
      }, {
        label: '考核模块',
        value: 'AssessModule',
      }, {
        label: '待考核',
        value: 'WaitingTab',
      }, {
        label: '自评考核',
        value: 'SelfTab',
      }],
      activeTab: 'AssessManagement',
    }
  },
}
</script>
