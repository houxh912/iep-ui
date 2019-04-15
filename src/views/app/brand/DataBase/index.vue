<template>
  <div class="grid-content">
    <iepAppTabCard :title="title">
      <ul class="data-base">
        <li v-for="(item,index) in gridReport" :key="index">{{item}}</li>
      </ul>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '资料库 宣传 模块 活动',
      gridReport: ['国脉集团宣传PPT（16篇）', '营商环境评价中心（8篇）', '国脉集团简介文档（99）', '数据治理研究院（16篇）', '营商环境评价中心（8篇）', '数字经济研究所（11篇）', '最多跑一次研究改革中心（3篇）'],
    }
  },
}
</script>
<style lang='scss' scoped>
.title {
  margin-right: 10px;
  font-size: 18px;
  color: #000;
}
.data-base {
  padding-left: 15px;
}
.data-base li {
  font-size: 14px;
  color: #000;
  text-align: left;
  margin-bottom: 12px;
}
</style>

