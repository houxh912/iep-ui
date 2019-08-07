<template>
  <div class="leaderBoard">
    <IepAppTabsCard isMore :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Empolyee'" v-slot:Empolyee>
          <empolyee v-loading="activeTab !=='Empolyee'"></empolyee>
        </template>
        <template v-if="activeTab ==='Study'" v-slot:Study>
          <study v-loading="activeTab !=='Study'"></study>
        </template>
        <template v-if="activeTab ==='Share'" v-slot:Share>
          <share v-loading="activeTab !=='Share'"></share>
        </template>
        <template v-if="activeTab ==='Activity'" v-slot:Activity>
          <activity v-loading="activeTab !=='Activity'"></activity>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Activity from './Activity'
import Empolyee from './Empolyee'
import Share from './Share'
import Study from './Study'
export default {
  components: {
    Activity,
    Empolyee,
    Share,
    Study,
  },
  data () {
    return {
      tabList: [{
        label: '组织风采',
        value: 'Empolyee',
      }, {
        label: '培训学习',
        value: 'Study',
        disabled: true,
      }, {
        label: '成果分享',
        value: 'Share',
        disabled: true,
      }, {
        label: '团建活动',
        value: 'Activity',
        disabled: true,
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
</style>