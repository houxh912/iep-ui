<template>
  <div>
    <div class="material" v-if="'/app/resource/material'==routerMatch[routerMatch.length-1].path">
      <menus></menus>
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle">
          <IepAppListCard :dataList="listList"></IepAppListCard>
        </IepAppTabCard>
        <ranking></ranking>
        <most></most>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Menus from './Menus'
import Librarys from './Librarys/'
import Ranking from './Ranking/'
import Most from './Most/'
export default {
  components: { Menus, Librarys, Ranking, Most},
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle: '猜你想找',
      labelList: ['营商通','营商环境','数据基因','数据政府','电子政务','数字经济','微服务','dips','知识图谱'],
      listList: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
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
  grid-template-columns: minmax(100px, 220px) minmax(100px, 680px) minmax(100px, 300px);
}
.piece{
}
.el-card{
  border:0;
}
.library{
  padding: 0 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
