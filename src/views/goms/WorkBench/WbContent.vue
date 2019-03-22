<template>
  <div class="wb-content">
    <basic-container>
      <page-header :title="`欢迎您，${userInfo.realName}`"></page-header>
      <el-alert title="模块更新" type="info" description="商机对接模块全新上线，请在模块设置中配置使用。" show-icon></el-alert>
      <div class="time-log-list-wrapper">
        <Timeline :pending="!isMore">
          <TimelineItem v-for="item in realLogList" :key="item.id">
            <log-item :logItem="item"></log-item>
          </TimelineItem>
          <TimelineItem v-if="!isMore"><a href="#" @click.native="handleViewMore">查看更多</a></TimelineItem>
        </Timeline>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getOrgLogList } from '@/api/goms/org'
import LogItem from './LogItem'
import take from 'lodash/take'
export default {
  components: { LogItem },
  data () {
    return {
      bodyStyle: {
        padding: 0,
      },
      logList: [],
      isMore: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
    realLogList () {
      if (this.isMore) {
        return this.logList
      } else {
        return take(this.logList, 15)
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleViewMore () {
      this.isMore = true
    },
    loadPage () {
      getOrgLogList().then(({ data }) => {
        this.logList = data.data
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
