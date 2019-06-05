<template>
  <div class="staff-report">
    <leader-top></leader-top>
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='StaffWeek'" v-slot:StaffWeek>
          <staff-week v-loading="activeTab !=='StaffWeek'"></staff-week>
        </template>
        <template v-if="activeTab ==='StaffMonth'" v-slot:StaffMonth>
          <staff-month v-loading="activeTab !=='StaffMonth'"></staff-month>
        </template>
      </iep-tabs>
    </basic-container>  
  </div>
</template>
<script>
import LeaderTop from '../LeaderTop'
import StaffWeek from './StaffWeek'
import StaffMonth from './StaffMonth'
export default {
  components: {
    LeaderTop,
    StaffWeek,
    StaffMonth,
  },
  data () {
    return {
      tabList: [{
        label: '员工周报',
        value: 'StaffWeek',
      }, {
        label: '员工月报',
        value: 'StaffMonth',
      }],
      activeTab: 'StaffWeek',
    }
  },
}
</script>
<style scoped lang='scss'>
.staff-report{
    padding: 20px;
}
</style>
