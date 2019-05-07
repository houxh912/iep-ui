<template>
  <div>
    <div class="material">
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
        <IepAppTabCard :title="rankingTitle">
          <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
        </IepAppTabCard>
      </div>
    </div>
  </div>
</template>
<script>
import Librarys from './Librarys/'
export default {
  components: { Librarys },
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle: '最新商机',
      rankingTitle: '热门商机',
      labelList: ['营商通', '营商环境', '数据基因', '数据政府', '电子政务', '数字经济', '微服务', 'dips', '知识图谱'],
      listList: ['国脉数据基因政务大数据整体解决方案', '国脉数据基因政务大数据整体解决方案', '国脉数据基因政务大数据整体解决方案', '国脉数据基因政务大数据整体解决方案'],
      dataList: [
        { name: '珠海市营商环境评估', color: 'red' },
        { name: '珠海市营商环境评估', color: 'red' },
        { name: '珠海市营商环境评估', color: 'red' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
        { name: '珠海市营商环境评估', color: '' },
      ],
    }
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
.piece {
}
.ranking {
  padding: 0;
}
.el-card {
  border: 0;
}
.library {
  padding-right: 20px;
  border-right: 1px solid #ebeef5;
}
</style>
