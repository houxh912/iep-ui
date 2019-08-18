<template>
  <div class="gov-person-content">
    <div class="top-content">
      <busines-system></busines-system>
      <!--  制度文件-->
      <competence-list></competence-list>
      <construction-project></construction-project>
      <recommendable></recommendable>
      <project-manager></project-manager>
      <manager-ranking></manager-ranking>
    </div>
    <div class="copies">
      <customer-rsources></customer-rsources>
      <market-opportunity></market-opportunity>
      <project-resources></project-resources>
      <internal-expert></internal-expert>
      <project-quality></project-quality>
      <!-- <quality-control></quality-control>质量管控 -->
      <institutional></institutional>
    </div>
    <div class="copies copies2">
      <experience-training></experience-training>
      <feedback></feedback>
      <reward></reward>
    </div>
  </div>
</template>
<script>
import BusinesSystem from './BusinesSystem'
import Institutional from './Institutional'
import CompetenceList from './CompetenceList'
import ConstructionProject from './ConstructionProject/'
import Recommendable from './Recommendable'
import ProjectManager from './ProjectManager/'
import ManagerRanking from './ManagerRanking/'
import CustomerRsources from './CustomerRsources'
import MarketOpportunity from './MarketOpportunity'
import ProjectResources from './ProjectResources'
import InternalExpert from './InternalExpert'
import ProjectQuality from './ProjectQuality'
// import QualityControl from './QualityControl'
import ExperienceTraining from './ExperienceTraining'
import Feedback from './Feedback'
import Reward from './Reward'
export default {
  components: { BusinesSystem, CompetenceList, ConstructionProject, Recommendable, ProjectManager, ManagerRanking, CustomerRsources, MarketOpportunity, ProjectResources, InternalExpert, ProjectQuality, Institutional, ExperienceTraining, Feedback, Reward },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.gov-person-content {
  margin: 0 auto;
  width: 1200px;
  .top-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 20px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 875px) minmax(100px,300px);
  }
  .block {
    margin-top: 20px;
    width: 100%;
  }
  .copies {
    display: grid;
    margin-top: 20px;
    grid-auto-flow: row dense;
    grid-row-gap: 20px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 300px) minmax(100px, 550px) minmax(100px,300px);
  }
  .copies2 {
    margin-bottom: 20px;
  }
}
</style>

