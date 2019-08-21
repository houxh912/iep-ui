<template>
  <iep-app-layout>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wealth" v-if="'/app/wealth'==routerMatch[routerMatch.length-1].path">
      <div class="library">
        <librarys ref="librarys" class="librarys"></librarys>
      </div>
      <div class="piece">
        <!-- <IepAppTabCard :title="listTitle">
          <IepAppListCard :dataList="listList"></IepAppListCard>
        </IepAppTabCard> -->
        <ranking></ranking>
      </div>
    </div>
    <router-view v-else></router-view>
  </iep-app-layout>
</template>
<script>
import Librarys from './Librarys/'
import Ranking from './Ranking/'
import { getRectagsList } from '@/api/app/tms/index'
import { getGuessList } from '@/api/app/mlms/index'

export default {
  components: { Librarys, Ranking },
  data () {
    return {
      // listTitle: '猜你想找',
      listList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  methods: {
    changePage (val) {
      this.$refs['librarys'].loadPage({ wealthClsSecondClass: val })
    },
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({ data }) => {
        this.labelList = data.data
      })
    },
    // 猜你想找
    getGuessList () {
      getGuessList().then(({ data }) => {
        this.listList = data.data
      })
    },
  },
  created () {
    this.getRectagsList()
    this.getGuessList()
  },
}
</script>
<style lang="scss" scoped>
.library {
  min-height: calc(100vh - 120px);
}
.piece {
  cursor: pointer;
}
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 0;
  }
}
.wealth {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 900px) minmax(100px, 300px);
}
.el-card {
  border: 0;
}
.library {
  padding: 0 20px;
  border-right: 1px solid #ebeef5;
}
</style>
