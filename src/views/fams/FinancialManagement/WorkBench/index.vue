<template>
  <div>
    <basic-container class="container-grid">
      <financial-assets></financial-assets>
      <processing></processing>
    </basic-container>
  </div>
</template>
<script>
import FinancialAssets from './FinancialAssets'
import Processing from './Processing'
export default {
  components: {
    FinancialAssets,
    Processing,
  },
}
</script>
<style lang="scss" scoped>
.container-grid {
  display: grid;
  grid-column-gap: 25px;
}
</style>
