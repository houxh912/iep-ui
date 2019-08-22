<template>
  <iep-app-layout>
    <h3 class="title">早晚五分钟，为<span class="akey">智慧</span>加油</h3>
    <headTpl class="head" @load-page="loadPage"></headTpl>
    <div class="content">
      <tabsTpl v-model="tabName" :tab-list="tabList" class="content-left">
        <template v-if="tabName ==='allThougth'" v-slot:allThougth>
          <library ref="library" @load-page="submitCallBack" :dataList="dataList" :params="params"></library>
          <div style="text-align: center;margin: 20px 0;">
            <el-pagination background layout="prev, pager, next, total" :current-page.sync="params.current" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
          </div>
        </template>
        <template v-if="tabName ==='followThougth'" v-slot:followThougth>
          <library ref="library" @load-page="submitCallBack" :dataList="dataList" :params="params"></library>
          <div style="text-align: center;margin: 20px 0;">
            <el-pagination background layout="prev, pager, next, total" :current-page.sync="params.current" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
          </div>
        </template>
        <template v-if="tabName ==='subject'" v-slot:subject>
          <subjectPage ref="subject"></subjectPage>
        </template>
        <!-- 搜索 -->
        <template v-slot:search>
          <searchTpl @load-page="searchPage" ref="search" v-if="isSearchShow"></searchTpl>
        </template>
      </tabsTpl>
      <div class="content-right">
        <rightTpl ref="contentRight"></rightTpl>
      </div>
    </div>
    
  </iep-app-layout>
</template>

<script>
import { geTallPage, getFollowPage } from '@/api/cpms/thoughts'
import headTpl from './library/form'
import rightTpl from './right'
import library from './library'
import subjectPage from './subjectPage/'
import tabsTpl from './tabsTpl'
import searchTpl from './search'

const initParams = () => {
  return {
    current: 1,
    size: 10,
  }
}

export default {
  components: { headTpl, rightTpl, library, subjectPage, tabsTpl, searchTpl },
  data () {
    return {
      isShow: true,
      routerMatch: [
        {
          path: '/app/index',
          name: '首页',
        },
        {
          path: '/app/person',
          name: '国脉人',
        },
        {
          path: '/app/more_thoughts',
          name: '说说列表',
        },
      ],
      commontActiveIndex: -1,
      paramData: {},
      total: 0,
      activeIndex: -1,
      params: initParams(),
      dataList: [],
      tabList: [
        {
          label: '全部',
          value: 'allThougth',
        }, {
          label: '关注',
          value: 'followThougth',
        }, {
          label: '话题',
          value: 'subject',
        },
      ],
      tabName: 'allThougth',
    }
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    // 我要发布
    handlePublish () {
      this.$refs['publish'].open()
    },
    submitCallBack () {
      this.loadPage()
      this.$refs['contentRight'].loadData()
    },
    loadPage () {
      let fn = () => {}
      if (this.tabName === 'allThougth') {
        fn = geTallPage
      } else {
        fn = getFollowPage
      }
      fn(Object.assign({}, this.params, this.paramData)).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
        this.activeIndex = -1
      })
    },
    // 搜素
    searchPage (params) {
      if (params) {
        this.paramData = Object.assign({}, this.paramData, params)
      }
      this.loadPage()
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.params = initParams()
      this.paramData = {}
      this.$refs['search'].clearSearchParam()
      this.tabName = 'allThougth'
      if (this.$route.query.id) {
        this.params.userId = this.$route.query.id
      } else {
        this.params.userId = ''
      }
      this.loadPage()
    })
    next()
  },
  created () {
    if (this.$route.query.id) {
      this.params.userId = this.$route.query.id
    }
    this.loadPage()
  },
  watch: {
    tabName (newVal) {
      let loadPage = () => {
        this.dataList = []
        this.params = initParams()
        this.loadPage()
      }
      if (newVal === 'allThougth') {
        loadPage()
        this.isSearchShow = true
      } else if (newVal === 'followThougth') {
        loadPage()
        this.isSearchShow = false
      } else if (newVal === 'subject') {
        this.isSearchShow = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h3.title {
  text-align: center;
  font-size: 24px;
  padding: 30px 0 20px;
  .akey {
    color: #c74c50;
  }
}
.head {
  margin: auto;
  margin-bottom: 20px;
  width: 1200px;
}
.content {
  display: flex;
  width: 1200px;
  margin: auto;
  .content-left {
    flex: 1;
    border-bottom: 1px solid #ddd;
    .explain {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 30px;
      h3 {
        font-size: 22px;
        color: #000;
        margin-right: 15px;
      }
      span {
        color: #999;
        font-size: 12px;
        line-height: 45px;
      }
    }
    .material {
      width: 100%;
      margin: 0 auto;
    }
  }
  .content-right {
    width: 300px;
    margin-left: 30px;
  }
}
</style>

<style scoped>
.content-left >>> .el-tabs__header {
  margin: 1px 0 15px;
}
</style>