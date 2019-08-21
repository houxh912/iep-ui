<template>
  <div class="project">
    <IepAppTabsCard isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Construction'" v-slot:Construction>
          <construction v-loading="activeTab !=='Construction'" :list="tabList[0].data"></construction>
        </template>
        <template v-if="activeTab ==='Built'" v-slot:Built>
          <built v-loading="activeTab !=='Built'" :list="tabList[1].data"></built>
        </template>
        <template v-if="activeTab ==='Finish'" v-slot:Finish>
          <finish v-loading="activeTab !=='Finish'" :list="tabList[2].data"></finish>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Construction from './Construction'
import Built from './Built'
import Finish from './finish'
import { getPerform, getIntention, getProjectend } from '@/api/app/prms/'
export default {
  components: {
    Built,
    Construction,
    Finish,
  },
  data () {
    return {
      tabList: [{
        label: '执行项目',
        value: 'Construction',
        data: [],
      }, {
        label: '待建项目',
        value: 'Built',
        data: [],
      }, {
        label: '完结项目',
        value: 'Finish',
        data: [],
      }],
      activeTab: 'Construction',
    }
  },
  created () {
    getPerform().then(({ data }) => {
      this.tabList[0].data = data.data.records.slice(0, 4)
      this.tabList[0].label = `执行项目（${data.data.total}个)`
    })
    getIntention().then(({ data }) => {
      this.tabList[1].data = data.data.records.slice(0, 4)
      this.tabList[1].label = `待建项目（${data.data.total}个)`
    })
    getProjectend().then(({ data }) => {
      this.tabList[2].data = data.data.records.slice(0, 4)
      this.tabList[2].label = `完结项目（${data.data.total}个)`
    })
  },
}
</script>
<style lang="css" scoped>
.project >>> .el-card {
  height: 346px;
}
</style>
