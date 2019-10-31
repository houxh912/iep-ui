<template>
  <div class="wb-content">
    <basic-container>
      <iep-page-header :title="`欢迎您，${userInfo.realName}`"></iep-page-header>
      <el-alert v-if="identity==='创建者'" title="智慧组织Smart Organization 创建教程" type="info" show-icon>
        您有尚未完成的SO创建任务，赶紧完成任务赚取能贝吧！
        <a @click.prevent="$openPage('/wel/orgwelcome')">查看任务</a>
      </el-alert>
      <div class="time-log-list-wrapper">
        <a-timeline :pending="pendingText" :reverse="false">
          <a-timeline-item v-for="item in logList" :key="item.id">
            <log-item :logItem="item"></log-item>
          </a-timeline-item>
        </a-timeline>
        <OperationWrapper>
          <iep-button type="primary" v-if="isMore" @click="handleViewMore" plain>查看更多</iep-button>
          <iep-button @click="handleRefresh">刷新</iep-button>
        </OperationWrapper>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getOrgLogList } from '@/api/goms/org'
import LogItem from './LogItem'
export default {
  components: { LogItem },
  data () {
    return {
      bodyStyle: {
        padding: 0,
      },
      pagination: {
        current: 1,
        size: 10,
        total: 10,
      },
      logList: [],
      pageLoading: true,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      identity: state => state.user.identity,
    }),
    pendingText () {
      if (this.pageLoading) {
        return '加载中'
      } else {
        return false
      }
    },
    isMore () {
      const { size, total, current } = this.pagination
      return total > size * current
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRefresh () {
      this.pagination.current = 1
      this.loadPage(true)
    },
    handleViewMore () {
      this.pagination.current++
      this.loadPage()
    },
    loadPage (isRefresh = false) {
      this.pageLoading = true
      getOrgLogList(this.pagination.current).then(({ data }) => {
        const { records, size, total, current } = data.data
        if (!isRefresh) {
          this.logList.push(...records)
        } else {
          this.logList = records
        }
        this.pagination = { current, size, total }
        this.pageLoading = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.wb-content {
  width: 100%;
}
.time-log-list-wrapper {
  margin-top: 20px;
  margin-left: 20px;
  .time {
    font-size: 14px;
    font-weight: bold;
  }
  .content {
    padding-left: 5px;
  }
}
</style>
