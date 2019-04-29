<template>
  <div class="gird-all">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='News'" v-slot:News>
            <news v-loading="activeTab !=='News'"></news>
          </template>
          <template v-if="activeTab ==='Material'" v-slot:Material>
            <material v-loading="activeTab !=='Material'"></material>
          </template>
          <template v-if="activeTab ==='Meeting'" v-slot:Meeting>
            <meeting v-loading="activeTab !=='Meeting'"></meeting>
          </template>
          <template v-if="activeTab ==='Project'" v-slot:Project>
            <project v-loading="activeTab !=='Project'"></project>
          </template>
          <template v-if="activeTab ==='Organization'" v-slot:Organization>
            <organization v-loading="activeTab !=='Organization'"></organization>
          </template>
          <template v-if="activeTab ==='Business'" v-slot:Business>
            <business v-loading="activeTab !=='Business'"></business>
          </template>
          <template v-if="activeTab ==='Product'" v-slot:Product>
            <product v-loading="activeTab !=='Product'"></product>
          </template>
          <template v-if="activeTab ==='Platform'" v-slot:Platform>
            <platform v-loading="activeTab !=='Platform'"></platform>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import News from './News'
import Material from './Material'
import Meeting from './Meeting'
import Project from './Project'
import Organization from './Organization'
import Business from './Business'
import Product from './Product'
import Platform from './Platform'
export default {
  components: {
    News,
    Material,
    Meeting,
    Project,
    Organization,
    Business,
    Product,
    Platform,
  },
  data () {
    return {
      linkName:'',
      tabList: [{
        label: '要闻(30)',
        value: 'News',
      }, {
        label: '材料(30)',
        value: 'Material',
      }, {
        label: '会议(30)',
        value: 'Meeting',
      }, {
        label: '项目(30)',
        value: 'Project',
      }, {
        label: '组织(30)',
        value: 'Organization',
      }, {
        label: '商机(30)',
        value: 'Business',
      }, {
        label: '产品(30)',
        value: 'Product',
      }, {
        label: '平台(30)',
        value: 'Platform',
      }],
      activeTab: 'News',
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
  padding:0 13px;
}
.gird-all >>> .el-tabs__header {
  margin-bottom: 20px;
}
</style>

