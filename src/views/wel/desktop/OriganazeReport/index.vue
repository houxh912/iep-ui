<template>
  <div class="origanaze-report">
    <leader-top></leader-top>  
    <basic-container>
      <span class="btn" @click="handleReturn">返回</span>
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
.origanaze-report{
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
.origanaze-report>>>.el-card__body{
  position: relative;
}
</style>
