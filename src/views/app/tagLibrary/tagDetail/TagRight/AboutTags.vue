<template>
  <IepAppTabCard :title="labelTitle">
    <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
  </IepAppTabCard>
</template>
<script>
export default {
  name:'AboutTags',
  data () {
    return {
      labelTitle: '相关标签',
      labelList: ['营商通','营商环境','数据基因','数据政府','电子政务','数字经济','微服务','dips','知识图谱'],
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card{
  border:0;
}
.library{
  padding: 0 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
<style scoped>
.el-card >>> .title{
  font-size: 18px;
}
</style>
