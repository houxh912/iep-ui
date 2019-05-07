<template>
  <div class="material-detail">
    <div class="library">
      <div class="client-top">
        <p>{{title}}</p>
        <span>市场经理：{{name[0]}}</span>
        <span>协助人：{{name[1]}}</span>
      </div>
      <customer></customer>
    </div>
    <div class="piece">
      <IepAppTabCard :title="labelTitle">
        <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
      </IepAppTabCard>
      <IepAppTabCard :title="listTitle1">
        <IepAppListCard :dataList="listList1"></IepAppListCard>
      </IepAppTabCard>
      <IepAppTabCard :title="rankingTitle">
        <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
      </IepAppTabCard>
    </div>
  </div>
</template>
<script>
import Customer from './Customer'
export default {
  components: {
    Customer,
  },
  data () {
    return {
      title: '厦门市信息中心标准规划部',
      name:['李凯','胡浩'], 
      labelTitle: '热门标签',
      listTitle1: '本周新增',
      rankingTitle: '合作次数最多',
      labelList: ['营商通','营商环境','数据基因','数据政府','电子政务','数字经济','微服务','dips','知识图谱'],
      listList1: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      dataList: [
        { name: '厦门市信息中心标准规划部' },
        { name: '深圳市经济贸易和信息化委员会'},
        { name: '象山政府部门'},
        { name: '珠海市营商环境评估'},
        { name: '珠海市营商环境评估'},
        { name: '珠海市营商环境评估'},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.client-top{
  margin-bottom: 15px;
  p{
    color:#333;
    font-size: 18px;
    margin-bottom: 8px;
  }
  span{
    margin-right: 10px;
    font-size: 14px;
  }
}
.material-detail {
  width: 1200px;
  margin: 0 auto 20px;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.piece{
}
.ranking {
  padding: 0;
}
.el-card{
  border:0;
}
.library{
  padding-right: 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link{
  font-weight: normal;
}
</style>
