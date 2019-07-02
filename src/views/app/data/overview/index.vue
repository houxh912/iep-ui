<template>
  <div class="right">
    <!-- <div class="test">
      <p>数据频道用于展示国脉集团的资源资产状况，构成比例和变化趋势，体现集团资源资产健康状况与集团发展趋势</p>
      <p>内网平台记录了所有数据与用户在平台中的流转过程、变更情况，乃据的整个生命周期。基于此，数据频道为您呈现各个模块、各个分类届性下的数据统计与数据变化趋势，在记录与计篝的过程中，给出数据的变化趋势，给予一定的决策辅助。</p>
      <p style="color:#ba1b21">数据频道正在建设中，敬诵期待，本页面仅为样式效果演示</p>
    </div> -->
    <!-- <business></business> -->
    <div class="half">
      <receipt></receipt>
      <performance></performance>
      <trends></trends>
      <resource></resource>
    </div>
    <div class="table">
      <mission></mission>
      <statistics></statistics>
      <meeting></meeting>
      <visit></visit>
      <project></project>
      <sales></sales>
    </div>
    <div class="three">
      <weights></weights>
      <use-candle></use-candle>
      <relationships></relationships>
    </div>
    <div class="ranking">
      <div class="title">{{title}}</div>
      <div class="three">
        <sectoral-assets></sectoral-assets>
        <sector-performance></sector-performance>
        <departmental-credit></departmental-credit>
        <investors></investors>
        <personal-credit></personal-credit>
        <contribution-value></contribution-value>
      </div>
    </div>
      <!-- <div class="half">
      <gender-age></gender-age>
    </div> -->
  </div>
</template>
<script>
// import Business from './components//Business' 
import Performance from './components/Performance'
import Receipt from './components//Receipt'
import Trends from './components//Trends'
import Resource from './components//Resource'
// import GenderAge from './components//GenderAge'
import UseCandle from './components//UseCandle'
import Weights from './components//Weights'
import Relationships from './components//Relationships'
import Mission from './components//Mission'
import Statistics from './components//Statistics'
import Visit from './components//Visit'
import Project from './components//Project'
import Sales from './components//Sales'
import Meeting from './components//Meeting'
import SectoralAssets from './components//SectoralAssets'
import SectorPerformance from './components//SectorPerformance'
import DepartmentalCredit from './components//DepartmentalCredit'
import Investors from './components//Investors'
import PersonalCredit from './components//PersonalCredit'
import ContributionValue from './components//ContributionValue'
export default {
  components: { Resource, Trends, Performance, Receipt, UseCandle, Weights, Relationships, Mission, Statistics, Meeting, Visit, Project, Sales, SectoralAssets, SectorPerformance, DepartmentalCredit, Investors, PersonalCredit, ContributionValue },
  data () {
    return {
      title: '排行榜',
    }
  },
}
</script>
<style lang="scss" scoped>
.right {
  margin: 10px 0 30px;
}
.half {
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  grid-auto-flow: row dense;
  grid-template-columns: 7fr 4fr;
}
.table {
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  grid-auto-flow: row dense;
  grid-template-columns: 2fr 2fr;
}
.three {
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr;
}
.ranking {
  .title {
    padding-bottom: 10px;
    font-size: 18px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}
</style>
<style scoped>
.right >>> .el-table th.is-leaf,
.right >>> .el-table td {
  border: 0;
}
.right >>> .el-table::before {
  height: 0;
  background: none;
}
</style>
