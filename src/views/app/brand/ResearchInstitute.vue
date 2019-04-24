<template>
  <div class="grid-content">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="title">国脉研究院</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看详情></el-button>
      </div>
      <div>
        <IepAppListCard :dataList="dataList"></IepAppListCard>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: ['数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）','营商环境评价中心（8篇）', '数字经济研究所（11篇）', '最多跑一次研究改革中心（3篇）'],
    }
  },
}
</script>
<style lang='scss' scoped>
</style>

