<template>
  <div>
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='ProApp'" v-slot:ProApp>
          <pro-app v-loading="activeTab !=='ProApp'" :form="formData"></pro-app>
        </template>
        <template v-if="activeTab ==='Accredit'" v-slot:Accredit>
          <accredit v-loading="activeTab !=='Accredit'" :isShow="addDialogShow" :detailShow="detailDialogShow" @detail-show="fn" @toggle-show="handleCreate"></accredit>
        </template>
      </iep-tabs>
      <transition name="fade">
        <add-dialog :isShow="addDialogShow" @close="val => addDialogShow = val"></add-dialog>
      </transition>
    </basic-container>
  </div>
</template>

<script>
import ProApp from './ProApp/' // 项目立项
import Accredit from './Accredit/' // 项目经理授权
import addDialog from './Accredit/addDialog'

export default {
  components: { ProApp, Accredit, addDialog },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    formData () {
      return this.form
    },
  },
  data () {
    return {
      addDialogShow: false,
      detailDialogShow: false,
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
    handleCreate () {
      this.addDialogShow = true
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
