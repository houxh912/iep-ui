<template>
  <basic-container>
    <div v-if="pageState === 'list'">
      <iep-page-header title="我的项目" :replaceText="replaceText" :data="[sum]"></iep-page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Release'" v-slot:Release>
          <total ref="table" :tabType="'2'" @statistics="statistics($event)"></total>
        </template>
        <template v-if="activeTab === 'International'" v-slot:International>
          <total ref="table" :tabType="'3'"></total>
        </template>
      </iep-tabs>
    </div>
    <add-dialog v-else ref="form"></add-dialog>
  </basic-container>
</template>
<script>
import Total from './Total/'
// import { getDataDetail } from '@/api/gpms/index'

export default {
  components: { Total },
  data () {
    return {
      replaceText: (data) => `[共${data[0]}条数据]`,
      tabList: [{
        label: '我的项目',
        value: 'Release',
      },  {
        label: '项目公海库',
        value: 'International',
      }],
      activeTab: 'Release',
      pageState: 'list',
      sum:'',
    }
  },
  methods: {
    statistics (val) {
      this.sum=val
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
