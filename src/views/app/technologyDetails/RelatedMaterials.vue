
<template>
  <div class="related-materials">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <IepAppListCard :dataList="dataList"></IepAppListCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title:'相关材料',
      dataList:['aaaaaaaaaaaa','aaaaaaaaaaaa','aaaaaaaaaaaa','aaaaaaaaaaaa','aaaaaaaaaaaa','aaaaaaaaaaaa'],
    }
  },
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.related-materials{
  border-top: 1px solid #f5f5f5;
  margin-top:20px; 
}
</style>
<style scoped>
</style>
