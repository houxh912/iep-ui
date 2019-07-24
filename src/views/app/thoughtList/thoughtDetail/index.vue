<template>
  <iep-app-layout>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <list ref="list" class="list"></list>
  </iep-app-layout>
</template>

<script>
import list from './list'
export default {
  components: { list },
  data () {
    return {
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    loadData () {},
  },
  created () {
    this.loadData()
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 20px;
  }
}
.list {
  margin: auto;
  width: 1200px;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>

