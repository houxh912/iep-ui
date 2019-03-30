<template>
  <div class="datum">
    <page-header title="报表"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='materialDialog'" v-slot:materialDialog>
        <material-dialog></material-dialog>
      </template>
      <template v-if="tabName ==='aptitudeDialog'" v-slot:aptitudeDialog>
        <aptitude-dialog></aptitude-dialog>
      </template>
      <template v-if="tabName ==='contractDialog'" v-slot:contractDialog>
        <contract-dialog></contract-dialog>
      </template>
      <template v-if="tabName ==='configureDialog'" v-slot:configureDialog>
        <configure-dialog></configure-dialog>
      </template>
      <template v-if="tabName ==='fileDialog'" v-slot:fileDialog>
        <file-dialog></file-dialog>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import IepTabs from '@/components/IepCommon/Tabs'
import MaterialDialog from './material/'
import AptitudeDialog from './aptitude/'
import ContractDialog from './contract/'
import ConfigureDialog from './configure/'
import FileDialog from './file/'

export default {
  name: 'datum',
  mixins: [ mixins ],
  components: { IepTabs, MaterialDialog, AptitudeDialog, ContractDialog, ConfigureDialog, FileDialog },
  data () {
    return {
      tabName: 'materialDialog',
      tabList: [
        {
          label: '材料',
          value: 'materialDialog',
        }, {
          label: '荣誉资质',
          value: 'aptitudeDialog',
        }, {
          label: '合同',
          value: 'contractDialog',
        }, {
          label: '分类配置',
          value: 'configureDialog',
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
