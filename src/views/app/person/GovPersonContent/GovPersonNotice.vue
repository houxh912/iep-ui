<template>
  <div>
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="dynamicList">
        <div v-for="(item,index) in dynamicList" :key="index" class="piece">
          <span>{{item.tip}}</span><span>{{item.text}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '通知公告',
      dynamicList: [{ tip: '【通知】', text: '国脉海洋获质量管理系认证' }, { tip: '【通知】', text: '舟山国脉考察' }, { tip: '【通知】', text: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, { tip: '【公告】', text: '热烈庆祝广州国脉公司乔迁开业' }, { tip: '【公告】', text: '国脉总经理郑爱军荣获“浙江创业女杰' }, { tip: '【公告】', text: '国脉物联网两大研究中心简介' }, { tip: '【公告】', text: '国脉物联网3.0版上线公告' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.dynamicList {
  .piece {
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
