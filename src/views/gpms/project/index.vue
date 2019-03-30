<template>
  <div>
    <basic-container>
      <page-header title="我的项目" :replaceText="replaceText" :data="[16]"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Total'" v-slot:Total>
          <total v-loading="activeTab !=='Total'" :isShow="addDialogShow" @toggle-show="val => addDialogShow = val"></total>
        </template>
        <template v-if="activeTab ==='Release'" v-slot:Release>
          <release v-loading="activeTab !=='Release'"></release>
        </template>
        <template v-if="activeTab === 'TakePartIn'" v-slot:TakePartIn>
          <take-part-in v-loading="activeTab !=='TakePartIn'"></take-part-in>
        </template>
      </iep-tabs>
    </basic-container>
    <transition name="fade">
      <add-dialog :isShow="addDialogShow" @close="val => addDialogShow = val"></add-dialog>
    </transition>
  </div>
</template>
<script>
import Total from './Total/'
import TakePartIn from './TakePartIn/'
import Release from './Release/'
import addDialog from './addDialog'
export default {
  components: { Total, TakePartIn, Release, addDialog },
  data () {
    return {
      replaceText: (data) => `[共${data[0]}条数据]`,
      addDialogShow: false,
      tabList: [{
        label: '全部',
        value: 'Total',
      }, {
        label: '我发布的',
        value: 'Release',
      }, {
        label: '我参与的',
        value: 'TakePartIn',
      }],
      activeTab: 'Total',
    }
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
