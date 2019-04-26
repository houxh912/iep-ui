<template>
  <div class="notice">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppAssortCard :dataList="dataList" class="notice-box">
        <span class="new" slot="label">NEW</span>
      </IepAppAssortCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '通知公告',
      dataList: [
        { assort: '【通知】', desc: '国脉海洋获质量管理系认证' }, 
        { assort: '【通知】', desc: '舟山国脉考察' }, 
        { assort: '【通知】', desc: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察' }, 
        { assort: '【公告】', desc: '热烈庆祝广州国脉公司乔迁开业' }, 
        { assort: '【公告】', desc: '国脉总经理郑爱军荣获“浙江创业女杰' }, 
        { assort: '【公告】', desc: '国脉物联网两大研究中心简介' }, 
        { assort: '【公告】', desc: '国脉物联网3.0版上线公告' },
      ],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.notice-box{
  position: relative;
  .new {
    padding: 0 3px;
    height: 20px;
    line-height: 18px;
    font-size: 12px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #cb3737;
    color: #cb3737;
    position:absolute;
    right: 0;
    top:7px;
  }
  .assort .piece{
    padding-right: 40px;
  }
}

</style>
<style scoped>
.notice >>> .el-card {
  height: 350px;
}
</style>
