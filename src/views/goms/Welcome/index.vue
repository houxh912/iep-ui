<template>
  <div class="iep-page-form">
    <div class="bg-top">
      <div class="title">{{templateText.h1}}</div>
      <div class="desc">{{templateText.h2}}</div>
      <operation-wrapper>
        <iep-button size="medium" :type="`${tabsActive==='1' ? 'primary':'default'}`" @click="handleChangeTab('1')">{{templateText.createText}}</iep-button>
        <iep-button size="medium" :type="`${tabsActive==='0' ? 'primary':'default'}`" @click="handleChangeTab('0')">{{templateText.joinText}}</iep-button>
      </operation-wrapper>
    </div>
    <basic-container>
      <div class="select-org-wrapper">
        <div class="bottom-wrapper">
          <component ref="tabList" :is="activeTab"></component>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import CreateOrg from './CreateOrg'
import JoinOrg from './JoinOrg'
const textMap = {
  // 我能
  [true]: {
    h1: '创建SO组织（企业/机构/团队/群组），实现您的组织梦',
    h2: '最优化匹配资源，通过协作、学习、管理、财富深度赋能，开启智慧组织之旅',
    createText: '我要创建SO组织',
    joinText: '寻找加入SO组织',
  },
  // 内网
  [false]: {
    h1: '创建 （企业/机构/团队/群组），实现您的组织梦',
    h2: '最优化匹配资源，通过协作、学习、管理、财富深度赋能，开启智慧组织之旅',
    createText: '我要创建组织',
    joinText: '寻找加入组织',
  },
}
export default {
  name: 'WelcomeOrg',
  components: { JoinOrg, CreateOrg },
  data () {
    return {
      // eslint-disable-next-line
      IS_ICAN,
    }
  },
  computed: {
    templateText () {
      return textMap[this.IS_ICAN]
    },
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
  background-image: url("/img/bg/ban-join.jpg");
  background-repeat: round;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 20px 0 20px;
  border-radius: 5px;
  .title {
    font-size: 28px;
  }
  .desc {
    color: #999;
    margin: 10px 0;
  }
}
.select-org-wrapper {
  padding: 0 30px;
  .bottom-wrapper {
    margin-top: 20px;
  }
}
</style>
