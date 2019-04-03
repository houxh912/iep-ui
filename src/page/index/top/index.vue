<template>
  <div class="top">
    <div class="top-left">
      <div class="logo-wrapper">
        <div class="logo" @click="$openPage('/')"></div>
        <el-dropdown>
          <span class="el-dropdown-link">
            国脉智慧平台
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$openPage('http://www.echinagov.com/', 'url')">
              国脉电子政务网
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('http://www.besticity.com/', 'url')">
              国脉智慧城市网
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('http://www.im2m.com.cn/', 'url')">
              国脉物联网
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('http://www.smartqian.com/', 'url')">
              司马钱
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('http://www.databanker.cn/', 'url')">
              数邦客
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('http://www.allship.cn/', 'url')">
              中船通
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('http://www.51banhui.com/', 'url')">
              蟠桃会
            </el-dropdown-item>
            <el-dropdown-item @click.native="$openPage('https://www.govmade.com/yingst/', 'url')">
              营商通
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <top-navbar></top-navbar>
    </div>
    <div class="top-right">
      <top-guide></top-guide>
      <top-message></top-message>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.realName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$openPage('/')">
            首页
          </el-dropdown-item>
          <el-dropdown-item @click.native="handleOrg(orgText.type)">
            {{orgText.tipText}}
          </el-dropdown-item>
          <el-dropdown-item @click.native="$openPage('BaseSettings','name')">
            个人信息
          </el-dropdown-item>
          <el-dropdown-item @click.native="handleAbout">
            关于
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <select-org-dialog ref="selectOrgDialog"></select-org-dialog>
    <about-dialog ref="AboutDialog"></about-dialog>
  </div>
</template>
<script>
import SelectOrgDialog from './SelectOrgDialog'
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenfullscreen } from '@/util/util'
import TopNavbar from './TopNavbar'
import TopMessage from './TopMessage'
import TopGuide from './TopGuide'
import AboutDialog from './AboutDialog'
export default {
  components: {
    TopNavbar,
    TopMessage,
    TopGuide,
    SelectOrgDialog,
    AboutDialog,
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
    handleAbout () {
      this.$refs.AboutDialog.dialogShow = true
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
.top-left >>> .el-dropdown {
  color: #424242;
  cursor: pointer;
  width: 140px;
}
</style>

<style lang="scss" scoped>
.top {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: rgba(0, 0, 0, 0.65);
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .top-left {
    display: flex;
    margin-left: 20px;
    .logo-wrapper {
      margin: 13px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      .logo {
        cursor: pointer;
        margin-right: 5px;
        width: 76px;
        height: 32px;
        background-image: url("/img/logo.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
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
