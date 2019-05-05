<template>
  <div class="material-detail">
    <div class="library">
      <client-details></client-details>
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
      <IepAppTabCard :title="listTitle2">
        <IepAppListCard :dataList="listList2"></IepAppListCard>
      </IepAppTabCard>
    </div>
  </div>
</template>
<script>
import ClientDetails from './ClientDetails'
export default {
  components: { ClientDetails },
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle2: '优秀客户方案',
      listTitle1: '猜你想找',
      rankingTitle: '热搜榜',
      labelList: ['营商通','营商环境','数据基因','数据政府','电子政务','数字经济','微服务','dips','知识图谱'],
      listList1: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      listList2: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      dataList: [
        { name: '厦门市信息中心标准规划部' },
        { name: '深圳市经济贸易和信息化委员会'},
        { name: '象山政府部门'},
        { name: '珠海市营商环境评估'},
        { name: '珠海市营商环境评估'},
        { name: '珠海市营商环境评估'},
      ],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    //console.log(to, from)
    this.routerMatch = to.matched
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
}
</script>
<style lang="scss" scoped>
.material-detail {
  width: 1200px;
  margin: 20px auto;
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
