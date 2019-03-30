<template>
  <div>
    <basic-container>
      <page-header title="立项阶段" :backOption="backOption"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='ProApp'" v-slot:ProApp>
          <pro-app v-loading="activeTab !=='ProApp'"></pro-app>
        </template>
        <template v-if="activeTab ==='Accredit'" v-slot:Accredit>
          <accredit v-loading="activeTab !=='Accredit'" :isShow="addDialogShow" :detailShow="detailDialogShow" @detail-show="fn" @toggle-show="val => addDialogShow = val"></accredit>
        </template>
      </iep-tabs>
      <transition name="fade">
        <add-dialog :isShow="addDialogShow" @close="val => addDialogShow = val"></add-dialog>
      </transition>
      <transition name="fade">
        <detail-dialog :detailShow="detailDialogShow" @close="val => detailDialogShow = val"></detail-dialog>
      </transition>
    </basic-container>
  </div>
</template>
<script>
import ProApp from './ProApp/'
import Accredit from './Accredit/'
import addDialog from './addDialog'
import detailDialog from './detailDialog'
export default {
  components: { ProApp, Accredit, addDialog, detailDialog },
  data () {
    return {
      addDialogShow: false,
      detailDialogShow: false,
      backOption: {
        isBack: true,
      },
      tabList: [{
        label: '项目立项',
        value: 'ProApp',
      }, {
        label: '项目经理授权',
        value: 'Accredit',
      }],
      activeTab: 'ProApp',
    }
  },
  methods: {
    fn (v) {
      this.detailDialogShow = v
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
