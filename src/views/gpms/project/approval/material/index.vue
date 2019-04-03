<template>
  <div>
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Normy'" v-slot:Normy>
          <normy v-loading="activeTab !=='Normy'"></normy>
        </template>
        <template v-if="activeTab ==='Norm'" v-slot:Norm>
          <norm v-loading="activeTab !=='Norm'"></norm>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import Normy from './Normy/'
import Norm from './Norm/'

export default {
  name: 'index',
  components: { Normy, Norm },
  data () {
    return {
      tabList: [{
        label: '纪要与周报',
        value: 'Normy',
      }, {
        label: '规范性材料',
        value: 'Norm',
      }],
      activeTab: 'Normy',
    }
  },
}
</script>

<style scoped>
</style>