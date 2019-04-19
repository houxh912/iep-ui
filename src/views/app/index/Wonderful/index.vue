<template>
  <div class="wonderful">
    <IepAppTabsCard isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Organization'" v-slot:Organization>
          <organization v-loading="activeTab !=='Organization'"></organization>
        </template>
        <template v-if="activeTab ==='Empolyee'" v-slot:Empolyee>
          <empolyee v-loading="activeTab !=='Empolyee'"></empolyee>
        </template>
        <template v-if="activeTab ==='Specialist'" v-slot:Specialist>
          <specialist v-loading="activeTab !=='Specialist'"></specialist>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Organization from './Organization'
import Empolyee from './Empolyee'
import Specialist from './Specialist'

export default {
  components: {
    Organization,
    Empolyee,
    Specialist,
  },
  data () {
    return {
      tabList: [{
        label: '组织风采(35)',
        value: 'Organization',
      }, {
        label: '员工风采(519)',
        value: 'Empolyee',
      }, {
        label: '专家风采(75)',
        value: 'Specialist',
      }],
      activeTab: 'Organization',
    }
  },
}
</script>
<style scoped>
.wonderful {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
}
</style>
<style lang="scss" >
.Organization ,.specialist,.Empolyee{
  padding: 15px 20px;
  .piece {
    text-align: center;
    width: 260px;
    float: left;
    margin: 0 5px;
    .img {
      width: 100%;
      height: 165px;
      overflow: hidden;
      img {
        width: 100%;
        height: 165px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .name {
      line-height: 40px;
    }
    &:first-child {
      margin: 0 15px 0 10px;
    }
    &:last-child {
      margin: 0 10px 0 15px;
    }
  }
}
</style>
<style scoped>
.iep-tabs >>> .el-tabs__nav-scroll {
  padding: 10px 20px 1px;
}
.iep-tabs >>> .el-tabs__nav{
  line-height:53px;
}
.iep-tabs >>> .el-tabs__item{
  font-size: 18px;
}
</style>

