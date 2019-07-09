<template>
  <div class="organization-left">
    <histogram :orgId="data.orgId" :orgName="data.name"></histogram>
    <project :counts="data.counts"></project>
    <project-switching :orgId="data.orgId"></project-switching>
  </div>
</template>
<script>
import Histogram from './Histogram/'
import Project from './Project'
import ProjectSwitching from './ProjectSwitching/'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { Histogram, Project, ProjectSwitching },
}
</script>
