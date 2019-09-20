<template>
  <iep-app-layout>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <iep-button @click="handleBack">返回</iep-button>
      </div>
    </div>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage" v-if="state"></list>
    <div class="no-data" v-else>{{response.msg}}</div>
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
      state: true,
      response: {},
    }
  },
  beforeRouteUpdate (to, from, next) {
    // this.routerMatch = to.matched
    next()
  },
  methods: {
    loadData (id) {
      getDetailById(id).then(({ data }) => {
        if (data.data) {
          this.state = true
          this.dataList = [data.data]
        } else {
          this.state = false
          this.response = data
        }
      })
    },
    loadPage () {
      this.loadData(this.$route.params.id)
    },
    handleBack () {
      this.$router.go(-1)
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
  display: flex;
  width: 1200px;
  margin: 20px auto 0;
  justify-content: space-between;
  .breadcrumb-item {
    padding: 0 0 20px 0;
  }
}
.list, .no-data {
  margin: auto;
  width: 1200px;
}
@media (max-width: 1400px) {
  .breadcrumb-wrapper {
    width: calc(100% - 200px);
  }
  .list, .no-data {
    width: calc(100% - 200px);
  }
}
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>

