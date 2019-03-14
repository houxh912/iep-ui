<template>
  <div class="top">
    <div class="top-left">
      <div class="logo-wrapper">
        <div class="logo" @click="$router.push({name: '首页'})"></div>
        <el-dropdown>
          <span class="el-dropdown-link">
            国脉智慧平台
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/">国脉智慧平台</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/">国脉智慧平台</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/index">国脉智慧平台</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/index">国脉智慧平台</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="center">
      <top-navbar></top-navbar>
    </div>
    <div class="top-right">
      <top-message></top-message>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.realName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="handleOrg(orgText.type)">{{orgText.tipText}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <select-org-dialog ref="selectOrgDialog"></select-org-dialog>
  </div>
</template>
<script>
import SelectOrgDialog from './SelectOrgDialog'
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenfullscreen } from '@/util/util'
import TopNavbar from './TopNavbar'
import TopMessage from './TopMessage'
export default {
  components: {
    TopNavbar,
    TopMessage,
    SelectOrgDialog,
  },
  name: 'Top',
  data () {
    return {
      showDot1: true,
      showDot2: true,
      showDot3: true,
    }
  },
  mounted () {
    listenfullscreen(this.setScreen)
  },
  computed: {
    ...mapState({
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showMenu: state => state.common.showMenu,
    }),
    ...mapGetters([
      'userInfo',
      'isFullScren',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag',
      'noOrg',
    ]),
    orgText () {
      return this.noOrg ? {
        tipText: '无组织(加入/创建)',
        type: 0,
      } : {
          tipText: '切换组织',
          type: 1,
        }
    },
  },
  methods: {
    handleOrg (type) {
      if (type === 0) {
        this.$router.push({ name: '选择组织' })
      } else {
        this.$refs['selectOrgDialog'].dialogShow = true
      }
    },
    handleScreen () {
      fullscreenToggel()
    },
    setCollapse () {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen () {
      this.$store.commit('SET_FULLSCREN')
    },
    logout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    },
  },
}
</script>
<style scoped>
.top-right >>> .el-dropdown {
  color: #424242;
  margin: 0 20px;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  margin-right: 5px;
  width: 76px;
  height: 32px;
  background-image: url("/img/logo.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: rgba(0, 0, 0, 0.65);
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .top-left {
    margin-left: 20px;
    .logo-wrapper {
      margin: 13px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
  .top-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media (min-width: 0px) and (max-width: 1270px) {
  .logo {
    width: 50px;
    height: 22px;
  }
  .top-left {
    line-height: 34px;
  }
}
</style>
