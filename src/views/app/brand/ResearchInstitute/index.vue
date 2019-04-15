<template>
  <div class="grid-content">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="title">国脉研究院</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看详情></el-button>
      </div>
      <ul class="grid-report">
        <li v-for="(item,index) in gridReport" :key="index">{{item}}</li>
      </ul>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      gridReport: ['数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）', '营商环境评价中心（8篇）', '数字经济研究所（11篇）', '最多跑一次研究改革中心（3篇）'],
    }
  },
}
</script>
<style lang='scss' scoped>
.title {
  font-size: 18px;
  color: #000;
}
.grid-report {
  padding-left: 15px;
}
.grid-report li {
  font-size: 14px;
  color: #000;
  text-align: left;
  margin-bottom: 13px;
}
</style>

