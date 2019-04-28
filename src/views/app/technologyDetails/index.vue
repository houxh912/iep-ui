<template>
  <div>
    <div class="technology-details">
      <div>
        <menus></menus>
      </div>
      <div>
        <introduction></introduction>
        <basic-information></basic-information>
        <application-module></application-module>
        <technical-application></technical-application>
        <related-materials></related-materials>
      </div>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import Menus from './Menus'
import Introduction from './Introduction'
import BasicInformation from './BasicInformation'
import ApplicationModule from './ApplicationModule'
import TechnicalApplication from './TechnicalApplication'
import RelatedMaterials from './RelatedMaterials'
export default {
  components:{ Menus, Introduction, BasicInformation, ApplicationModule, TechnicalApplication, RelatedMaterials },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.technology-details {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 220px) minmax(100px, 880px);
}

</style>
<style scoped>
</style>

