<template>
  <div>
    <div class="material">
      <menus></menus>
      <div class="library">
        <div class="heard">
          <div class="left">
            <div label="材料库" name="first">材料库<span>{{title}}</span></div>
          </div>
          <div class="right">
            <operation-search @search-page="searchPage" advance-search>
              <advance-search @search-page="searchPage"></advance-search>
            </operation-search>
          </div>
        </div>
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
  </div>
</template>
<script>
import Menus from './Menus'
import Ranking from './Ranking/'
import Most from './Most/'
export default {
  components: { Menus, Ranking, Most },
  data () {
    return {
      labelTitle: '推荐主题',
      listTitle: '猜你想找',
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
  grid-template-columns: minmax(100px, 220px) minmax(100px, 680px) minmax(100px, 300px);
}
.library{
  width: 100%;
  padding:0 20px;
  .heard{
    height: 52px;
    padding-top: 8px;
    border-bottom: solid 1px #e6e6e6;
    .left{
      float: left;
      > div{
        font-size: 18px;
        line-height: 42px;
        padding:0 10px;
        border-bottom: 2px solid #ba1b21;
      }
    }
    .right{
      float: right;
    }
  }
}
.piece{
}
</style>
