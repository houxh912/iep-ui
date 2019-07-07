<template>
  <div>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wealth">
      <div class="library">
        <librarys ref="librarys" class="librarys"></librarys>
      </div>
      <div class="piece">
        <!-- <ranking></ranking> -->
      </div>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import Librarys from './Librarys/'
// import Ranking from './Ranking/'
import { getRectagsList } from '@/api/app/tms/index'
import { getGuessList } from '@/api/app/mlms/index'

export default {
  components: { Librarys },
  data () {
    return {
      listList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    changePage (val) {
      this.$refs['librarys'].loadPage({ projectName: val })
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
    padding: 0 0 20px 20px;
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
