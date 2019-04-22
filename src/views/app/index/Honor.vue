<template>
  <div class="honor">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="honor-list">
        <div v-for="(item,index) in honorList" :key="index" class="piece">
          {{item}}
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉荣誉',
      honorList: ['高新企业认证', '市场营销管理系统V1.0-软件著作权', '数据基因软著', '人才招聘系统V1.0-软件著作权', '中船通客户关系管理软件V1.0-软件著', '订单管理软件V1.0-软件著作权', '船友互动圈软件V1.0-软件著作权', '市场营销管理系统V1.0-软件著作权', '营商通V1.0-软件著作权', '内网V1.0-软件著作权'],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.honor-list {
  .piece {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    position: relative;
    margin-left: 15px;
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 12px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
