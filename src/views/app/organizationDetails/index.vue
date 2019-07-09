<template>
  <iep-app-layout>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="organizationDetails">
      <menus></menus>
      <div class="con">
        <iep-page-header :title="title" :backOption="backOption"></iep-page-header>
        <router-view></router-view>
      </div>
    </div>
  </iep-app-layout>
</template>
<script>
import Menus from './Menus'

export default {
  components: { Menus },
  data () {
    return {
      routerMatch: this.$route.matched,
      title: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.push(`/app/organization_style/${this.$route.query.id}`)
        },
      },
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
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
.organizationDetails {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 220px) minmax(100px, 980px);
  .con {
    margin-top: 20px;
  }
}
</style>
<style scoped>
.con >>> .title-wrapper {
  margin-bottom: 0;
}
</style>
