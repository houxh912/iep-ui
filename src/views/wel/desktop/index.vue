<template>
  <div>
    <div class="desktop">
      <div class="full">
        <leader-top></leader-top>
      </div>
      <div class="full">
        <financial-assets></financial-assets>
      </div>
      <div class="full">
        <project-receipt></project-receipt>
      </div>
      <div>
        <budget></budget>
      </div>
      <div>
        <bulleted-list></bulleted-list>
      </div>
      <div class="full">
        <post-statistics></post-statistics>
      </div>
    </div>
  </div>
</template>
<script>
import LeaderTop from './LeaderTop'
import FinancialAssets from './FinancialAssets'
import ProjectReceipt from './ProjectReceipt'
import Budget from './Budget'
import BulletedList from './BulletedList'
import PostStatistics from './PostStatistics'
export default {
  components: { LeaderTop, FinancialAssets, ProjectReceipt, Budget, BulletedList, PostStatistics },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.desktop {
  padding: 20px;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
  .full {
    grid-column-start: 1;
    grid-column-end: 3;
    height: auto;
  }
}
</style>
