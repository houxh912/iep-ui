<template>
  <div class="container">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <keep-alive>
          <iep-tabs v-model="activeTab" :tab-list="tabList">
            <template v-if="activeTab ==='General'" v-slot:General>
              <general></general>
            </template>
            <template v-if="activeTab ==='Declare'" v-slot:Declare>
              <declare></declare>
            </template>
            <template v-if="activeTab ==='Analysis'" v-slot:Analysis>
              <analysis></analysis>
            </template>
            <template v-if="activeTab ==='Information'" v-slot:Information>
              <information></information>
            </template>
          </iep-tabs>
        </keep-alive>
      </IepAppTabsCard>
    </div>
  </div>
</template>

<script>
import General from '../../../govdata/PolicyCenter/general'
import Declare from '../../../govdata/PolicyCenter/declare'
import Analysis from '../../../govdata/PolicyCenter/analyzing'
import Information from '../../../govdata/PolicyCenter/information'
export default {
  components: {
    General,
    Declare,
    Analysis,
    Information,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '通用政策',
        value: 'General',
      }, {
        label: '申报政策',
        value: 'Declare',
      }, {
        label: '政策解读',
        value: 'Analysis',
      },
      {
        label: '政策资讯',
        value: 'Information',
      }],
      activeTab: 'General',
    }
  },

}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  padding: 0 0 25px 0;
  width: 1230px;
  height: 100%;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .leaderBoard {
    background-color: #ccc;
    grid-column-start: 1;
    grid-column-end: 4;
    position: relative;
  }
}
</style>
<style scoped>
.container >>> .el-button--medium i {
  font-size: 28px;
  color: #aaa;
}
.container >>> .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.container >>> .el-tabs__item {
  font-size: 18px;
}
.container >>> .el-tabs__header {
  margin-bottom: 30px;
}
.container >>> .el-card {
  border: 0;
}
.container >>> .el-button--medium {
  padding: 0;
  width: 60px;
  height: 60px;
}
.container >>> .el-button--medium.el-badge__content.is-fixed {
  right: 20px;
}
</style>