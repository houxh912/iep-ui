<template>
  <basic-container>
    <h3 class="title">
      <iep-page-header :title="`#${title}#`" :backOption="backOption"></iep-page-header>
    </h3>
    <div class="content">
      <div class="content-left">
        <div class="explain">
          <h3>说说列表</h3><span>（共{{total}}条说说）</span>
        </div>
        <div class="list">
          <IepNoData v-if="dataList.length == 0"></IepNoData>
          <div v-else>
            <div class="material">
              <library ref="library" @load-page="submitCallBack" :dataList="dataList" :params="params"></library>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
        </div>
      </div>
    </div>

  </basic-container>
</template>

<script>
import { getTopicThoughts } from '@/api/cpms/thoughts'
import library from '@/views/app/thoughtList/library'

const initParams = () => {
  return {
    current: 1,
    size: 10,
    topicId: 0,
  }
}

export default {
  components: { library },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1)
        },
      },
      isShow: true,
      title: '',
      total: 0,
      params: initParams(),
      dataList: [],
    }
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    submitCallBack () {
      this.loadPage()
      this.$refs['subject'].loadData()
    },
    loadPage () {
      getTopicThoughts(this.params).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
      })
    },
  },
  created () {
    this.title = this.$route.query.title
    this.params.topicId = this.$route.query.id
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.head {
  margin: auto;
  margin-bottom: 20px;
  width: 1200px;
}
.content {
  display: flex;
  width: 100%;
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
.title >>> .page-title {
  font-size: 24px !important;
}
</style>
