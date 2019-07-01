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
      <organization-left-d :data="data"></organization-left-d>
      <organization-right-d :data="data"></organization-right-d>
    </div>
  </div>
</template>
<script>
import OrganizationLeftTop from './OrganizationLeftTop'
import OrganizationRightTop from './OrganizationRightTop'
import OrganizationLeftD from './OrganizationLeftD'
import OrganizationRightD from './OrganizationRightD'
import team from './team/'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { OrganizationLeftTop, OrganizationRightTop, team, OrganizationRightD, OrganizationLeftD },
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