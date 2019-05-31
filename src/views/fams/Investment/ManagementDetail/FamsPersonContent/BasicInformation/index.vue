<template>
  <div class="fams-person">
    <process-schedule>
    </process-schedule>
    <basic-data>
    </basic-data>
    <investor>
    </investor>
    <stock-composition>
    </stock-composition>
  </div>
</template>

<script>
import ProcessSchedule from './ProcessSchedule'
import BasicData from './BasicData'
import Investor from './Investor'
import StockComposition from './StockComposition'
export default {
  name: 'FamsPerson',
  components: { ProcessSchedule, BasicData, Investor, StockComposition },
  data () {
    return {
    }
  },
}
</script>
<style scoped>
.sub-title {
  margin: 20px 0;
}
</style>

