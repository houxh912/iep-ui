<template>
  <IepAppTabCard title="相关标签">
    <iep-no-data v-if="!form.tagList.length"></iep-no-data>
    <IepAppLabelCard :dataList="form.tagList.map(m => m.commonName)"></IepAppLabelCard>
  </IepAppTabCard>
</template>
<script>
export default {
  name: 'AboutTags',
  props: ['form'],
}
</script>
<style lang="scss" scoped>
.el-card {
  border: 0;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
</style>
<style scoped>
.el-card >>> .title {
  font-size: 18px;
}
</style>
