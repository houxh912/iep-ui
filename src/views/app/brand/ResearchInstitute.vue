<template>
  <div class="research">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button class="btn" type="text" slot="right">我要发表</el-button>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉研究院',
      linkName: '',
      dataList: ['数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）', '营商环境评价中心（8篇）', '数字经济研究所（11篇）', '最多跑一次研究改革中心（3篇）'],
    }
  },
}
</script>
<style lang='scss' scoped>
.btn {
  margin-right: 5px;
  padding: 0;
  height: 22px;
  line-height: 22px;
  &:hover {
    opacity: 0.7;
  }
}
</style>
<style scoped>
.index-card >>> .el-card__body {
  padding: 15px 0;
}
.el-card {
  padding: 0 20px;
}
.research >>> .el-card {
  height: 316px;
}
</style>
