<template>
  <div class="organization-main">
    <div class="organization-content">
      <organization-left-top :data="data"></organization-left-top>
      <organization-right-top :data="data"></organization-right-top>
    </div>
    <div class="middle">
      <team :data="data" :orgId="data.orgId"></team>
    </div>
    <div class="organization-content">
      <talent-demand :orgId="data.orgId" :data="data"></talent-demand>
      <products-services :orgId="data.orgId" :data="data"></products-services>
      <texture-score :data="data"></texture-score>
      <collaborative-record :data="data" v-if="false"></collaborative-record>
      <new-down :visitVOs="data.visitVOs" :data="data"></new-down>
    </div>
  </div>
</template>
<script>
import OrganizationLeftTop from './OrganizationLeftTop'
import OrganizationRightTop from './OrganizationRightTop'
import TalentDemand from './TalentDemand'
import TextureScore from './TextureScore'
import team from './team/'
import ProductsServices from './ProductsServices'
import CollaborativeRecord from './CollaborativeRecord'
import NewDown from './NewDown'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { OrganizationLeftTop, OrganizationRightTop, team, ProductsServices, TalentDemand, TextureScore, CollaborativeRecord, NewDown },
}
</script>
<style lang="scss" scoped>
.organization-main {
  margin-top: 25px;
}
.organization-content {
  display: grid;
  margin: 0 auto;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
.middle {
  margin: -10px auto;
  width: 1200px;
}
</style>
<style lang="css" scoped>
.organization-content >>> .organization-left .important {
  float: right;
}
</style>