<template>
  <div>
    <div class="module-details">
      <introduction></introduction>
      <r-d-progress></r-d-progress>
      <basic-information></basic-information>
      <team-information></team-information>
      <all-versions></all-versions>
      <application-module></application-module>
      <technical-application></technical-application>
      <related-materials></related-materials>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import Introduction from './Introduction'
import RDProgress from './RDProgress'
import BasicInformation from './BasicInformation'
import TeamInformation from './TeamInformation'
import AllVersions from './AllVersions'
import ApplicationModule from './ApplicationModule'
import TechnicalApplication from './TechnicalApplication'
import RelatedMaterials from './RelatedMaterials'
export default {
  components: { Introduction, RDProgress, BasicInformation, TeamInformation, AllVersions, ApplicationModule, TechnicalApplication, RelatedMaterials },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.module-details {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  .tab {
    height: 80px;
    line-height: 80px;
    font-size: 18px;
  }
}
</style>
<style scoped>
</style>

