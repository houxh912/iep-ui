<template>
  <div>
    <div class="gird-product" v-if="'/app/resource/product_ku'==routerMatch[routerMatch.length-1].path">
      <div class="leaderBoard">
        <IepAppTabsCard :linkName="linkName">
          <iep-tabs v-model="activeTab" :tab-list="tabList">
            <template v-if="activeTab ==='Module'" v-slot:Module>
              <module v-loading="activeTab !=='Module'" @click-add="handleAdd"></module>
            </template>
            <template v-if="activeTab ==='Customized'" v-slot:Customized>
              <customized v-loading="activeTab !=='Customized'" @click-add="handleAdd"></customized>
            </template>
          </iep-tabs>
        </IepAppTabsCard>
        <el-badge @click.native="dialogShow" :value="countValue" class="item">
          <el-button size="medium" icon="el-icon-goods"></el-button>
        </el-badge>
        <dialog-show class="dialog-show" ref="DialogShow" @get-size="handleGetSize"></dialog-show>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Module from './Module'
import Customized from './Customized'
import DialogShow from './DialogShow'
export default {
  components: {
    Module,
    Customized,
    DialogShow,
  },
  data () {
    return {
      countValue: '',
      linkName: '',
      tabList: [{
        label: '产品模块',
        value: 'Module',
      }, {
        label: '组合系统',
        value: 'Customized',
      }],
      activeTab: 'Module',
      routerMatch: this.$route.matched,
    }
  },
  created () {
    if (this.$route.query.type == 2) {
      this.activeTab = 'Customized'
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    handleGetSize (val) {
      this.countValue = val
    },
    handleAdd () {
      this.$refs['DialogShow'].loadPage()
    },
    dialogShow () {
      this.$refs['DialogShow'].dialogShow = true
    },
  },
}
</script>
<style scoped lang="scss">
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-product {
  margin: 0 auto;
  padding: 0 0 25px 0;
  width: 1200px;
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
    grid-column-start: 1;
    grid-column-end: 4;
    position: relative;
    .dialog-show {
      position: absolute;
      right: 15px;
      top: 32%;
    }
    .item {
      position: fixed;
      right: 16px;
      top: 40%;
    }
  }
}
</style>
<style scoped>
.gird-product >>> .el-button--medium i {
  font-size: 28px;
  color: #aaa;
}
.gird-product >>> .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.gird-product >>> .el-tabs__item {
  font-size: 18px;
}
.gird-product >>> .el-tabs__header {
  margin-bottom: 30px;
}
.gird-product >>> .el-card {
  border: 0;
}
.gird-product >>> .el-button--medium {
  padding: 0;
  width: 60px;
  height: 60px;
}
.gird-product >>> .el-button--medium.el-badge__content.is-fixed {
  right: 20px;
}
</style>

