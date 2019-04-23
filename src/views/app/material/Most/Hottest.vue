<template>
  <div class="hottest">
    <IepAppListCard :dataList="dataList"></IepAppListCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: ['高新企业认证', '市场营销管理系统V1.0-软件著作权', '数据基因软著', '人才招聘系统V1.0-软件著作权', '中船通客户关系管理软件V1.0-软件著', '订单管理软件V1.0-软件著作权', '船友互动圈软件V1.0-软件著作权', '市场营销管理系统V1.0-软件著作权', '营商通V1.0-软件著作权', '内网V1.0-软件著作权'],
    }
  },
}
</script>
<style lang="scss" scoped>
.hottest{
  padding: 0 20px 20px 20px;
}
</style>


