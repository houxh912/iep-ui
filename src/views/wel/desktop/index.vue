<template>
  <div>
    <basic-container>
      <div class="grid-container">
        <div class="item-grid-1">
          <leader-top></leader-top>
        </div>
        <div class="item-grid-2">
          <fund-distribution></fund-distribution>
        </div>
        <div class="item-grid-3">
          <dev-ops></dev-ops>
        </div>
        <div class="item-grid-4">
          <financial-assets></financial-assets>
        </div>
        <div class="item-grid-5">
          <project-receipt></project-receipt>
        </div>
        <div class="item-grid-6">
          <budget></budget>
        </div>
        <div class="item-grid-7">
          <bulleted-list></bulleted-list>
        </div>
        <div class="item-grid-8">
          <post-statistics></post-statistics>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import LeaderTop from './LeaderTop'
import FundDistribution from './FundDistribution'
import DevOps from './DevOps'
import FinancialAssets from './FinancialAssets'
import ProjectReceipt from './ProjectReceipt'
import Budget from './Budget'
import BulletedList from './BulletedList'
import PostStatistics from './PostStatistics'
export default {
  components: { LeaderTop, FundDistribution, DevOps, FinancialAssets, ProjectReceipt, Budget, BulletedList, PostStatistics },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 100px 407px 150px 515px 350px 300px;
  grid-template-areas: "item-grid-1 item-grid-1 item-grid-1 item-grid-1" "item-grid-2 item-grid-2 item-grid-2 item-grid-3" "item-grid-4 item-grid-4 item-grid-4 item-grid-4" "item-grid-5 item-grid-5 item-grid-5 item-grid-5" "item-grid-6 item-grid-6 item-grid-6 item-grid-7" "item-grid-8 item-grid-8 item-grid-8 item-grid-8";
  grid-gap: 25px;
}

.item-grid-1 {
  grid-area: item-grid-1;
}

.item-grid-2 {
  grid-area: item-grid-2;
}

.item-grid-3 {
  grid-area: item-grid-3;
}

.item-grid-4 {
  grid-area: item-grid-4;
}

.item-grid-5 {
  grid-area: item-grid-5;
}

.item-grid-6 {
  grid-area: item-grid-6;
}

.item-grid-7 {
  grid-area: item-grid-7;
}

.item-grid-8 {
  grid-area: item-grid-8;
}
</style>
