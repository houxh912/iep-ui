<template>
  <div class="leaderBoard">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Empolyee'" v-slot:Empolyee>
          <empolyee v-loading="activeTab !=='Empolyee'"></empolyee>
        </template>
        <template v-if="activeTab ==='Brilliant'" v-slot:Brilliant>
          <brilliant v-loading="activeTab !=='Brilliant'"></brilliant>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Empolyee from './Empolyee'
import Brilliant from './Brilliant'
export default {
  components: {
    Empolyee,
    Brilliant,
  },
  data () {
    return {
      tabList: [{
        label: '组织风采',
        value: 'Empolyee',
      }, {
        label: '精彩瞬间',
        value: 'Brilliant',
      }],
      activeTab: 'Empolyee',
      linkName: '/app/organizational_list',
    }
  },
}
</script>
<style scoped>
.leaderBoard >>> .el-carousel__arrow {
  background: none;
}
.leaderBoard >>> .el-carousel__arrow i {
  font-size: 36px;
  color: #666;
}
.leaderBoard >>> .el-carousel__item {
  left: 25px;
  width: 96%;
}
.leaderBoard >>> .el-carousel__arrow--left {
  left: -10px;
}
.leaderBoard >>> .el-carousel__arrow--right {
  right: -10px;
}
.leaderBoard >>> .el-carousel__indicators--horizontal {
  display: none;
}
.leaderBoard >>> .el-carousel__arrow {
  top: 40%;
}
</style>