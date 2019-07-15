<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟基本信息"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='UnionModule'" v-slot:UnionModule>
          <union-module v-loading="activeTab !=='UnionModule'"></union-module>
        </template>
        <template v-if="activeTab ==='UnionMembers'" v-slot:UnionMembers>
          <union-members v-loading="activeTab !=='UnionMembers'"></union-members>
        </template>
        <template v-if="activeTab ==='UnionSettings'" v-slot:UnionSettings>
          <union-settings v-loading="activeTab !=='UnionSettings'"></union-settings>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import UnionModule from './UnionModule/'
import UnionSettings from './UnionSettings/'
import UnionMembers from './UnionMembers/'
export default {
  components: { UnionModule, UnionSettings, UnionMembers },
  data () {
    return {
      tabList: [
        {
          label: '联盟模块',
          value: 'UnionModule',
        },
        {
          label: '名下组织',
          value: 'UnionMembers',
        },
        {
          label: '联盟设置',
          value: 'UnionSettings',
        },
      ],
      activeTab: 'UnionModule',
    }
  },
}
</script>
