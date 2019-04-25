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
  </div>
</template>
<script>
import resourceRoute from '@/router/app/resource'
export default {
  data () {
    return {
      resourceRoute,
      router: this.$router,
      route: this.$route,
      routerMatch: this.$router.currentRoute.matched,
    }
  },
  methods: {
    handleOpen (item) {
      this.$router.push({
        path: `/app/resource/${item.path}`,
      })
    },
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
    margin: 20px auto 10px auto;
    width: 1200px;
    padding-left: 20px;
  }
}
</style>
