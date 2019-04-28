<template>
  <div>
    <div class="nav-bar">
      <div class="resource-wrapper">
        <div v-for="item in resourceRoute" :key="item.path" class="resource-item" @click="handleOpen(item)">
          <i :class="item.icon"></i>
          <div class="resource-title">{{item.name}}</div>
          <div class="resource-count">{{item.count}}</div>
        </div>
      </div>
    </div>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view></router-view>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import resourceRoute from '@/router/app/resource'
export default {
  data () {
    return {
      resourceRoute,
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
  methods: {
    handleOpen (item) {
      this.$router.push({
        path: `/app/resource/${item.path}`,
      })
    },
  },
  created () {
    this.$notify({
      title: '注意',
      message: '此页面正在开发中，当前数据仅供参考。',
      offset: 60,
    })
  },
}
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 150px;
  background-color: rgb(243, 243, 243);
  display: flex;
  justify-content: center;
}
.resource-wrapper {
  width: 1200px;
  display: flex;
  justify-content: space-around;
}
.resource-item {
  cursor: pointer;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgb(250, 250, 250);
  }
  & > i {
    font-size: 30px !important;
  }
  .resource-title {
    font-size: 16px;
  }
  .resource-count {
    font-size: 18px;
  }
}
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 20px;
    border-bottom: 1px solid #eee;
  }
}
</style>
