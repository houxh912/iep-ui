<template>
  <iep-app-layout>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage"></list>
  </iep-app-layout>
</template>

<script>
import list from './list'
import { getDetailById } from '@/api/cpms/thoughts'
export default {
  components: { list },
  data () {
    return {
      routerMatch: [
        {
          name: '说说首页',
          path: '/app/more_thoughts',
        }, {
          name: '说说详情',
          path: '/app/thought_detail/:id',
        },
      ],
      dataList: [],
    }
  },
  beforeRouteUpdate (to, from, next) {
    // this.routerMatch = to.matched
    next()
  },
  methods: {
    loadData (id) {
      getDetailById(id).then(({ data }) => {
        this.dataList = [data.data]
      })
    },
    loadPage () {
      this.loadData(this.$route.params.id)
    },
  },
  created () {
    this.loadData(this.$route.params.id)
    console.log('routerMatch: ', this.routerMatch)
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 0;
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

