<template>
  <div class="baner">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="dynamic-list">
        <div v-for="(item,index) in dynamicList" :key="index" class="piece">
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
      title: '国脉动态',
      dynamicList: [
        '【喜报】国脉海洋获质量管理体系认证',
        '【要闻】中国建设银行总行首席经济学专家',
        '【喜报】热烈庆祝广州国脉公司乔迁开业',
        '【喜报】国脉总经理郑爱军荣获“浙江创业女杰',
        '【要闻】国脉总经理郑爱军受邀为长三角地区作',
        '【要闻】首届长三角营商环境论坛在沪召开',
      ],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.dynamic-list {
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
