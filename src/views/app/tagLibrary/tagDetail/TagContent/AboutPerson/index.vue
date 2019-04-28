<template>
  <div class="gird-all">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='AboutPerson'" v-slot:AboutPerson>
            <about-person v-loading="activeTab !=='AboutPerson'"></about-person>
          </template>
          <template v-if="activeTab ==='Job'" v-slot:Job>
            <job v-loading="activeTab !=='Job'"></job>
          </template>
          <template v-if="activeTab ==='Ability'" v-slot:Ability>
            <ability v-loading="activeTab !=='Ability'"></ability>
          </template>
          <template v-if="activeTab ==='Hobby'" v-slot:Hobby>
            <hobby v-loading="activeTab !=='Hobby'"></hobby>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import AboutPerson from './AboutPerson'
import Job from './Job'
import Ability from './Ability'
import Hobby from './Hobby'
export default {
  components: {
    AboutPerson,
    Job,
    Ability,
    Hobby,
  },
  data () {
    return {
      linkName:'',
      tabList: [{
        label: '相关人物(30)',
        value: 'AboutPerson',
      }, {
        label: '职业(30)',
        value: 'Job',
      }, {
        label: '能力(30)',
        value: 'Ability',
      }, {
        label: '兴趣爱好(30)',
        value: 'Hobby',
      }],
      activeTab: 'AboutPerson',
    }
  },
}
</script>
<style scoped lang="scss">

</style>
<style scoped>
.gird-all >>> .el-card {
  border: 0;
  padding:0;
}
.gird-all >>> .el-tabs__item {
  font-size: 18px;
}
.gird-all >>> .el-tabs__header {
  margin-bottom: 30px;
}
</style>

