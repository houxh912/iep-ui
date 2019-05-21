<template>
  <div>
    <basic-container>
      <div class="container-grid">
        <financial-assets></financial-assets>
        <processing></processing>
        <project-accounting></project-accounting>
      </div>
    </basic-container>
  </div>
</template>
<script>
import FinancialAssets from './FinancialAssets'
import Processing from './Processing'
import ProjectAccounting from './ProjectAccounting'
export default {
  components: {
    FinancialAssets,
    Processing,
    ProjectAccounting,
  },
}
</script>
<style lang="scss" scoped>
.container-grid {
  display: grid;
  grid-row-gap: 20px;
}
</style>
