<template>
  <div class="iep-page-form">
    <basic-container>
      <div class="select-org-wrapper">
        <div class="top-wrapper">
          <i class="el-icon-warning"></i>
          <span v-if="noOrg" class="remind-text">您尚未加入任何组织，请选择</span>
          <span v-else class="remind-text">您已在 {{userInfo.orgName}} 的组织</span>
          <el-button :type="`${tabsActive ? 'default':'primary'}`" size="mini" @click="tabsActive=0">加入组织</el-button>
          <el-button :type="`${tabsActive ? 'primary':'default'}`" size="mini" @click="tabsActive=1">创建组织</el-button>
        </div>
        <div class="bottom-wrapper">
          <template v-if="tabsActive===0">
            <join-org></join-org>
          </template>
          <div v-if="tabsActive===1" class="create-org-container">
            <create-org></create-org>
          </div>
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
      tabsActive: 0,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'noOrg',
    ]),
  },
}
</script>
<style scoped="scoped" lang="scss">
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
