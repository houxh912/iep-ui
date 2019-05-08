<template>
  <div>
    <div class="material" v-if="'/app/resource/client'==routerMatch[routerMatch.length-1].path">
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="listTitle1">
          <IepAppListCard :dataList="listList1"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="rankingTitle">
          <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle2">
          <IepAppListCard :dataList="listList2"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle3">
          <IepAppListCard :dataList="listList3"></IepAppListCard>
        </IepAppTabCard>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Librarys from './Librarys/'
export default {
  components: { Librarys },
  data () {
    return {
      labelTitle: '热门标签',
      listTitle2: '优秀客户方案',
      listTitle3: '客户资讯',
      listTitle1: '本周新增',
      rankingTitle: '合作次数最多',
      labelList: ['营商通','营商环境','数据基因','数据政府','电子政务','数字经济','微服务','dips','知识图谱'],
      listList1: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      listList2: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      listList3: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
      dataList: [
        { name: '厦门市信息中心标准规划部', color: 'red' },
        { name: '深圳市经济贸易和信息化委员会', color: 'red' },
        { name: '象山政府部门', color: 'red' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
      ],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
}
</script>
<style lang="scss" scoped>
.material {
  width: 1200px;
  margin: 0 auto;
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
