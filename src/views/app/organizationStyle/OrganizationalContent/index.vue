<template>
  <div class="organization-content">
    <organization-left></organization-left>
    <organization-right></organization-right>
  </div>
</template>
<script>
import OrganizationRight from './OrganizationRight'
import OrganizationLeft from './OrganizationLeft'
export default {
  components: { OrganizationLeft, OrganizationRight },
}
</script>
<style lang="scss" scoped>
.organization-content {
  display: grid;
  margin: 0 auto;
  padding-top: 30px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 40px;
  grid-column-gap: 40px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
</style>
<style lang="css" scoped>
.organization-content >>> .organization-left .important {
  float: right;
}
</style>