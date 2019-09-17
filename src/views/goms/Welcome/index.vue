<template>
  <div class="iep-page-form">
    <div class="bg-top">
      <div class="desc">欢迎来到
        <span class="keyword">{{keyword}}</span>
        ，你可以在这里加入组织或创建组织，你可以通过<span class="keyword">{{keyword}}</span>进行协同办公、学习成长和财富增值，在这里大家都在登记个人资源、管理个人财富、共享<span class="keyword">{{keyword}}</span>资源、上报工作计划、自主学习考试、信息查收推送、在线沟通聊天。</div>
      <div class="title-wrapper">
        <div class="title">加入{{keyword}}</div>
        <div class="slogan">--为你的组织无限赋能</div>
      </div>
    </div>
    <basic-container>
      <div class="select-org-wrapper">
        <div class="top-wrapper">
          <i class="el-icon-warning"></i>
          <span v-if="noOrg" class="remind-text">您尚未加入任何组织，请选择</span>
          <span v-else class="remind-text">您已在 {{userInfo.orgName}} 的组织</span>
          <el-button :type="`${tabsActive==='0' ? 'primary':'default'}`" size="mini" @click="handleChangeTab('0')">加入组织</el-button>
          <el-button :type="`${tabsActive==='1' ? 'primary':'default'}`" size="mini" @click="handleChangeTab('1')">创建组织</el-button>
        </div>
        <div class="bottom-wrapper">
          <component ref="tabList" :is="activeTab"></component>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateOrg from './CreateOrg'
import JoinOrg from './JoinOrg'
export default {
  name: 'WelcomeOrg',
  components: { JoinOrg, CreateOrg },
  data () {
    return {
      keyword: '我能',
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'noOrg',
    ]),
    tabsActive () {
      return this.$route.query.type || '0'
    },
    activeTab () {
      const componentsMap = {
        '0': 'join-org',
        '1': 'create-org',
      }
      return componentsMap[this.tabsActive]
    },
  },
  methods: {
    handleChangeTab (key) {
      const query = { type: key }
      this.$router.replace({
        path: '/wel/org',
        query,
      })
    },
  },
}
</script>
<style scoped="scoped" lang="scss">
.bg-top {
  background-image: url("/img/bg/ban-join.webp");
  background-repeat: round;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .desc {
    margin: 0 50px;
    .keyword {
      color: $--color-primary;
    }
  }
  .title-wrapper {
    flex: 0 0 300px;
    font-size: 20px;
    color: $--color-primary;
  }
}
.select-org-wrapper {
  padding: 10px 30px;
  .top-wrapper {
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    .remind-text {
      font-size: 14px;
      margin-right: 10px;
      margin-left: 5px;
    }
  }
  .bottom-wrapper {
    margin-top: 20px;
  }
}
</style>
