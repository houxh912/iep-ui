<template>
  <div>
    <div class="material">
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="listTitle">
          <IepAppListCard :dataList="listList"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
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
      labelTitle: '本周新增',
      listTitle: '热门标签',
      labelList: ['营商通','营商环境','数据基因','数据政府'],
      listList: ['国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案','国脉数据基因政务大数据整体解决方案'],
    }
  },
}
</script>
<style lang="scss" scoped>
.material {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.piece{
}
</style>
