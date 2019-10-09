<template>
  <div class="ranking">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Talent'" v-slot:Talent>
          <talent v-loading="activeTab !=='Talent'"></talent>
        </template>
        <template v-if="activeTab ==='Popular'" v-slot:Popular>
          <popular v-loading="activeTab !=='Popular'"></popular>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Talent from './Talent'
import Popular from './Popular'
export default {
  components: {
    Talent,
    Popular,
  },
  data () {
    return {
      tabList: [{
        label: '投资达人',
        value: 'Talent',
      }, {
        label: '热门投资',
        value: 'Popular',
        disabled:true,
      }],
      activeTab: 'Talent',
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card {
  border: 0;
}
</style>
<style scoped>
.ranking >>> .name {
  cursor: pointer;
}
.ranking>>>.el-card{
  padding-right: 0;
}
</style>

