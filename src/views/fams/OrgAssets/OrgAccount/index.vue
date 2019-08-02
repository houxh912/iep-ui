<template>
  <div class="statistics">
    <basic-container>
      <div class="container-grid">
        <financial-assets></financial-assets>
        <org-in-out></org-in-out>
        <distribution-funds></distribution-funds>
      </div>
    </basic-container>
  </div>
</template>
<script>
import FinancialAssets from './FinancialAssets'
import OrgInOut from './OrgInOut'
import DistributionFunds from './DistributionFunds'
export default {
  components: {
    FinancialAssets,
    OrgInOut,
    DistributionFunds,
  },
}
</script>
<style lang="scss" scoped>
.container-grid {
  display: grid;
  grid-row-gap: 20px;
}
</style>
<style lang="css" scoped>
.statistics >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.statistics >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.statistics >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.statistics >>> :hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>