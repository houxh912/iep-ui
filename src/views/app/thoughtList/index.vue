<template>
  <iep-app-layout>
    <h3 class="title">早晚五分钟，为<span class="akey">智慧</span>加油</h3>
    <headTpl class="head" @load-page="loadPage"></headTpl>
    <div class="content">
      <div class="content-left">
        <div class="explain"><h3>说说列表</h3><span>（共{{total}}条说说）</span></div>
        <div class="list">
          <IepNoData v-if="dataList.length == 0"></IepNoData>
          <div v-else>
            <div class="material">
              <library ref="library" @load-page="loadPage" :dataList="dataList" :params="params"></library>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
        </div>
      </div>
      <div class="content-right">
        <rightTpl></rightTpl>
      </div>
    </div>
    
    <!-- 发表说说 -->
    <publish-dialog ref="publish" @load-page="searchPage"></publish-dialog>
    <!-- 转发 -->
    <forwardDialog ref="forward"></forwardDialog>
  </iep-app-layout>
</template>

<script>
import { geTallPage } from '@/api/cpms/thoughts'
import headTpl from './library/form'
import PublishDialog from '@/views/app/components/ThoughtsDialog/Publish'
import forwardDialog from './forwardDialog'
import rightTpl from './right'
import library from './library'

const initParams = () => {
  return {
    current: 1,
    size: 10,
  }
}

export default {
  components: { headTpl, PublishDialog, forwardDialog, rightTpl, library },
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
    }
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    searchPage (params) {
      if (params) {
        this.paramData = Object({}, this.paramData, params)
      }
      this.loadPage()
    },
    // 我要发布
    handlePublish () {
      this.$refs['publish'].open()
    },
    loadPage () {
      geTallPage(this.params).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
        this.activeIndex = -1
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      if (this.$route.query.id) {
        this.params.userId = this.$route.query.id
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
