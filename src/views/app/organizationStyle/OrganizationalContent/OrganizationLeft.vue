<template>
  <div class="organization-left">
    <histogram></histogram>
    <project></project>
    <project-switching></project-switching>
    <team></team>
    <talent-demand></talent-demand>
    <texture-score></texture-score>
  </div>
</template>
<script>
import Histogram from './Histogram'
import Project from './Project'
import ProjectSwitching from './ProjectSwitching'
import Team from './Team'
import TalentDemand from './TalentDemand'
import TextureScore from './TextureScore'
export default {
  components: { Histogram, Project, ProjectSwitching, Team, TalentDemand,TextureScore },
}
</script>
