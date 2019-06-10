<template>
  <div class="staff-report">
    <leader-top></leader-top>
    <basic-container>
      <span class="btn" @click="handleReturn">返回</span>
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
  mounted () {
    this.activeTab = this.$route.query.name
  },
  methods:{
    handleReturn () {
      this.$router.push('/wel/desktop')
    },
  },
}
</script>
<style scoped lang='scss'>
.staff-report{
    padding: 20px;
}
.btn {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 12px;
  color: #aaa;
  z-index: 3;
  border: 1px solid #ddd;
  border-radius:5px;
  padding: 1px 8px;
  &:hover{
    color:#999;
     border: 1px solid #ccc;
  }
}
</style>
<style scoped>
.staff-report>>>.el-card__body{
  position: relative;
}
</style>