<template>
  <div>
    <div class="breadcrumb-wrapper">
      <div class="back">
        <iep-button @click="handleBack">返回</iep-button>
      </div>
    </div>
    <list ref="list" class="list" :dataList="dataList" @load-page="loadPage"></list>
  </div>
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
  position: relative;
  width: 1200px;
  margin: 20px auto 0;
  text-align: right;
  .breadcrumb-item {
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

