<template>
  <div>
    <breadcrumb></breadcrumb>
    <div class="version-con">
      <version-sidebar></version-sidebar>
      <version-con></version-con>
    </div>
  </div>
</template>
<script>
import Breadcrumb from './Breadcrumb'
import VersionSidebar from './VersionSidebar'
import VersionCon from './VersionCon'
export default {
  components: {
    Breadcrumb,
    VersionSidebar,
    VersionCon,
  },
}
</script>
<style lang="scss" scoped>
.version-con {
  display: grid;
  margin: 0 auto;
  padding: 0 20px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 11fr);
  border-top: 1px solid #ebeef5;
}
</style>
