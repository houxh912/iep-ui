<template>
  <div>
    <!-- <headTpl class="head" @load-page="loadPage"></headTpl> -->
    <tabsTpl v-model="tabName" :tab-list="tabList" class="content">
      <!-- 说说列表 -->
      <template v-if="tabName ==='allThougth'" v-slot:allThougth>
        <div :class="topDataList.length ? 'content-top' : ''" v-if="!paramData.userId">
          <libraryTop :dataList="topDataList" @fresh-right="freshRight" @load-page="getToppedThoughts" isTop @fresh-all="freshAll"></libraryTop>
          <!-- <libraryTop ref="libraryTop" @load-page="submitCallBack" :dataList="topDataList" :params="params" @fresh-right="freshRight"></libraryTop> -->
        </div>
        <pageTpl ref="allThougth" :requestFn="geTallPage" :paramData="paramData" @fresh-right="freshRight" @fresh-all="getToppedThoughts"></pageTpl>
      </template>
      <!-- 关注列表 -->
      <template v-if="tabName ==='followThougth'" v-slot:followThougth>
        <pageTpl :requestFn="getFollowPage" :paramData="paramData" @fresh-right="freshRight"></pageTpl>
      </template>
      <!-- 话题列表 -->
      <template v-if="tabName ==='subject'" v-slot:subject>
        <subjectPage ref="subject"></subjectPage>
      </template>
      <!-- 搜索 -->
      <template v-slot:search>
        <searchThought @load-page="searchPage" ref="search" v-if="isSearchShow === 'thought'"></searchThought>
        <searchSubject @load-page="searchPage" ref="search" v-if="isSearchShow === 'subject'"></searchSubject>
      </template>
    </tabsTpl>

  </div>
</template>

<script>
import { geTallPage, getFollowPage, getToppedThoughts } from '@/api/cpms/thoughts'
import subjectPage from './subjectPage/'
import tabsTpl from './tabsTpl'
import searchThought from './search/thought'
import searchSubject from './search/subject'
import pageTpl from './page/'
import libraryTop from './page/library'

export default {
  components: {
    subjectPage,
    tabsTpl,
    searchThought,
    searchSubject,
    pageTpl,
    libraryTop,
  },
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
      isSearchShow: 'thought',
      geTallPage,
      getFollowPage,
      topDataList: [],
    }
  },
  methods: {
    // 我要发布
    handlePublish () {
      this.$refs['publish'].open()
    },
    loadPage () {
      if (this.tabName === 'allThougth') {
        this.$refs['allThougth'].loadPage()
      }
      this.$refs['contentRight'].loadData()
      this.getToppedThoughts()
    },
    // 获取置顶说说
    getToppedThoughts () {
      getToppedThoughts().then(({ data }) => {
        this.$set(this, 'topDataList', data.data)
      })
    },
    // 搜素
    searchPage (params, state) {
      if (state === 'thought') {
        if (params) {
          this.paramData = Object.assign({}, this.paramData, params)
        }
        this.$nextTick(() => {
          this.loadPage()
        })
      } else if (state === 'subject') {
        this.$refs['subject'].search(params)
      }
    },
    freshRight () {
      this.$refs['contentRight'].loadData()
    },
    freshAll () {
      this.$refs['allThougth'].loadPage()
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.paramData = {}
      this.$refs['search'].clearSearchParam()
      this.tabName = 'allThougth'
      if (this.$route.query.id) {
        this.paramData.userId = this.$route.query.id
      } else {
        this.paramData.userId = ''
      }
      this.$nextTick(() => {
        this.loadPage()
      })
    })
    next()
  },
  created () {
    if (this.$route.query.id) {
      this.paramData.userId = this.$route.query.id
    }
    this.getToppedThoughts()
  },
  watch: {
    tabName (newVal) {
      if (newVal === 'allThougth') {
        this.topDataList = []
        this.isSearchShow = 'thought'
        this.paramData.userId = ''
        this.getToppedThoughts()
      } else if (newVal === 'followThougth') {
        this.isSearchShow = 'follow'
        this.paramData.userId = ''
      } else if (newVal === 'subject') {
        this.isSearchShow = 'subject'
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
  padding: 0 20px;
}
.content {
  margin: auto;
  .content-top {
    border-bottom: 2px solid #ddd;
  }
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
</style>

<style scoped>
.content >>> .el-tabs__header {
  margin: 1px 0 15px;
}
.head >>> .input {
  padding: 20px;
  background-color: #fafafa;
}
.content >>> .search {
  right: 30px;
}
</style>
