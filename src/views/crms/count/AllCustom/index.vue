<template>
  <div class="allCustom">
    <info-column></info-column>
    <register-column></register-column>
    <visit-column></visit-column>
    <money-column></money-column>
    <analyse-column></analyse-column>
  </div>
</template>

<script>
import InfoColumn from './Components/InfoColumn'
import RegisterColumn from './Components/RegisterColumn'
import VisitColumn from './Components/VisitColumn'
import MoneyColumn from './Components/MoneyColumn'
import AnalyseColumn from './Components/AnalyseColumn'
export default {
  name: 'allCustom',
  components: { InfoColumn, RegisterColumn, VisitColumn, MoneyColumn, AnalyseColumn },
}
</script>
<style scoped>
.allCustom > div {
  margin-bottom: 20px;
}
</style>

