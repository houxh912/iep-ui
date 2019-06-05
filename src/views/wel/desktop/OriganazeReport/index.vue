<template>
  <div class="origanaze-report">
    <leader-top></leader-top>  
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='OriganazeWeek'" v-slot:OriganazeWeek>
          <origanaze-week v-loading="activeTab !=='OriganazeWeek'"></origanaze-week>
        </template>
        <template v-if="activeTab ==='OriganazeMonth'" v-slot:OriganazeMonth>
          <origanaze-month v-loading="activeTab !=='OriganazeMonth'"></origanaze-month>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import LeaderTop from '../LeaderTop'
import OriganazeWeek from './OriganazeWeek'
import OriganazeMonth from './OriganazeMonth'
export default {
  components: {
    LeaderTop,
    OriganazeWeek,
    OriganazeMonth,
  },
  data () {
    return {
      tabList: [{
        label: '组织周报',
        value: 'OriganazeWeek',
      }, {
        label: '组织月报',
        value: 'OriganazeMonth',
      }],
      activeTab: 'OriganazeWeek',
    }
  },
}
</script>
<style scoped lang='scss'>
.origanaze-report{
  padding: 20px;
}
</style>
