<template>
  <div class="resources">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Introduction'" v-slot:Introduction>
          <introduction v-loading="activeTab !=='Introduction'"></introduction>
        </template>
        <template v-if="activeTab ==='Assets'" v-slot:Assets>
          <assets v-loading="activeTab !=='Assets'"></assets>
        </template>
        <template v-if="activeTab ==='LatestInvestment'" v-slot:LatestInvestment>
          <latest-investment v-loading="activeTab !=='LatestInvestment'"></latest-investment>
        </template>
        <template v-if="activeTab ==='LatestTransfer'" v-slot:LatestTransfer :disabled="disabled">
          <latest-transfer v-loading="activeTab !=='LatestTransfer'"></latest-transfer>
        </template>
        <template v-if="activeTab ==='LatestNews'" v-slot:LatestNews>
          <latest-news v-loading="activeTab !=='LatestNews'"></latest-news>
        </template>
        <template v-if="activeTab ==='LatestAnnouncement'" v-slot:LatestAnnouncement>
          <latest-announcement v-loading="activeTab !=='LatestAnnouncement'"></latest-announcement>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Introduction from './Introduction'
import Assets from './Assets'
import LatestInvestment from './LatestInvestment'
import LatestTransfer from './LatestTransfer'
import LatestNews from './LatestNews'
import LatestAnnouncement from './LatestAnnouncement'
export default {
  props: {
    org: {
      type: Object,
      require: true,
      default: () => { },
    },
  },
  components: {
    Introduction,
    Assets,
    LatestInvestment,
    LatestTransfer,
    LatestNews,
    LatestAnnouncement,
  },
  data () {
    return {
      tabList: [{
        label: '投资介绍',
        value: 'Introduction',
      }, {
        label: '组织资产',
        value: 'Assets',
      }, {
        label: '最新投资',
        value: 'LatestInvestment',
      }, {
        label: '最新转让',
        value: 'LatestTransfer',
        disabled: true,
      }, {
        label: '最新资讯',
        value: 'LatestNews',
      }, {
        label: '最新公告',
        value: 'LatestAnnouncement',
      }],
      activeTab: 'Introduction',
    }
  },
  watch: {
    activeTab (val) {
      if (val === 'Assets') {
        this.$router.push(`/app/data_assets_detail?id=${this.org.orgId}&name=${this.org.orgName}`)
      }
    },
  },
}
</script>
<style scoped>
.resources >>> .el-card {
  height: 751px;
}
</style>

