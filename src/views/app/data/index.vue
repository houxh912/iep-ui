<template>
  <div class="data">
    <menus></menus>
    <div>
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
      <!--  <div class="half">
        <gender-age></gender-age>
      </div> -->
    </div>
  </div>
</template>
<script>
import Menus from './Menus'
// import Business from './Business' 
import Performance from './Performance'
import Receipt from './Receipt'
import Trends from './Trends'
import Resource from './Resource'
// import GenderAge from './GenderAge'
import UseCandle from './UseCandle'
import Weights from './Weights'
import Relationships from './Relationships'
import Mission from './Mission'
import Statistics from './Statistics'
import Visit from './Visit'
import Project from './Project'
import Sales from './Sales'
import Meeting from './Meeting'
import SectoralAssets from './SectoralAssets'
import SectorPerformance from './SectorPerformance'
import DepartmentalCredit from './DepartmentalCredit'
import Investors from './Investors'
import PersonalCredit from './PersonalCredit'
import ContributionValue from './ContributionValue'
export default {
  components: { Menus, Resource, Trends, Performance, Receipt, UseCandle, Weights, Relationships, Mission, Statistics, Meeting, Visit, Project, Sales, SectoralAssets, SectorPerformance, DepartmentalCredit, Investors, PersonalCredit, ContributionValue },
  data () {
    return {
      title: '排行榜',
    }
  },
}
</script>
<style lang="scss" scoped>
.data {
  width: 1200px;
  margin: 0 auto 20px;
  display: grid;
  grid-column-gap: 20px;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 130px) minmax(100px, 1070px);
  .test {
    width: 100%;
    padding: 20px;
    border: 1px solid #eee;
    > p {
      margin: 0;
    }
  }
  .half {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-flow: row dense;
    grid-template-columns: 7fr 4fr;
  }
  .table {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-flow: row dense;
    grid-template-columns: 2fr 2fr;
  }
  .three {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .ranking {
    .title {
      padding-bottom: 10px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
