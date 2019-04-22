<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
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
        label: '员工风采',
        value: 'Empolyee',
      }, {
        label: '培训学习',
        value: 'Study',
      }, {
        label: '成果分享',
        value: 'Share',
      }, {
        label: '团建活动',
        value: 'Activity',
      }],
      activeTab: 'Empolyee',
    }
  },
}
</script>
<style lang="scss">
.el-carousel {
  overflow: hidden;
}
.department-con {
  margin: 18px 0;
  padding: 0 80px;
  white-space: nowrap;
  overflow: hidden;
  .department-list {
    display: inline-block;
    margin: 0 15px;
    width: 22%;
    overflow: hidden;
    height: 200px;
    text-align: center;
    cursor: pointer;
    &:hover .sub-title {
      color: #cb3737;
    }
    .img {
      width: 100%;
      height: 140px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .sub-title {
      display: block;
      margin: 10px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
}
.el-carousel__container {
  height: 200px;
}
</style>
