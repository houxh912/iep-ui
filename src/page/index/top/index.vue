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
      <navbar></navbar>
    </div>
    <div class="top-right">
      <div class="top-msg">
        <div class="itemGroup">
          <div class="item">
            <span class="message"><i class="el-icon-star-off"></i></span>
            <span class="dot dot1" v-if="showDot1"></span>
          </div>
          <div class="item">
            <span class="message bell"><i class="el-icon-bell"></i></span>
            <span class="dot dot2" v-if="showDot2"></span>
          </div>
          <div class="item">
            <span class="message"><i class="el-icon-message"></i></span>
            <span class="dot  dot3" v-if="showDot3"></span>
          </div>
        </div>
        <el-tooltip v-if="userInfo.avatar" effect="dark" content="用户头像" placement="bottom">
          <img id="thumbnail" class="top-bar__img" />
        </el-tooltip>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.username }}
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
    </div>
    <select-org-dialog ref="selectOrgDialog"></select-org-dialog>
  </div>
</template>
<script>
import SelectOrgDialog from './SelectOrgDialog'
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenfullscreen, handleImg } from '@/util/util'
import navbar from './top-navbar'
export default {
  components: {
    navbar,
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
  filters: {},
  created () {
    handleImg(this.userInfo.avatar, 'thumbnail')
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

<style lang="scss" scoped>
.top {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: rgba(0, 0, 0, 0.65);
  height: 60px;
  box-sizing: border-box;
  white-space: nowrap;
  position: relative;
  .top-left {
    width: 240px;
    height: 100%;
    // background: #ccc;
    position: absolute;
    left: 0;
    top: 0;
    .logo-wrapper {
      margin: 13px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      .el-dropdown-link {
        color: #424242;
        padding-left: 5px;
      }
      .logo {
        cursor: pointer;
        width: 90px;
        height: 38px;
        background-image: url("/img/logo.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .center {
    height: 100%;
    // background: #222;
    margin: 0 300px 0 240px;
  }
  .top-right {
    width: 300px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    .top-msg {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      > div {
        flex-grow: 1;
      }
      .itemGroup {
        height: 100%;
        line-height: 60px;
        .item {
          display: inline-block;
          padding: 0 10px;
          font-size: 20px;
          position: relative;
          &:hover {
            background: #fafafa;
          }
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 12px;
            position: absolute;
            top: 20px;
            right: 0;
          }
          .dot1 {
            background: #bf051a;
          }
          .dot2 {
            background: #ff9d4c;
          }
          .dot3 {
            background: #ffc34a;
          }
        }
      }

      .el-dropdown-link {
        color: #6c6c6c;
      }
    }
  }
}

@media (min-width: 1024px) and (max-width: 1270px) {
  .top {
    .top-left {
      width: 180px;
      height: 100%;
      .logo-wrapper {
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        .logo {
          cursor: pointer;
          width: 50px;
          height: 22px;
          background-image: url("/img/logo.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .center {
      margin: 0 220px 0 180px;
    }
    .top-right {
      width: 220px;
      .el-tooltip {
        display: none;
      }
    }
  }
}
@media (min-width: 0px) and (max-width: 1023px) {
  .top {
    .top-left {
      width: 180px;
      height: 100%;
      .logo-wrapper {
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        .logo {
          cursor: pointer;
          width: 50px;
          height: 22px;
          background-image: url("/img/logo.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .center {
      margin: 0 220px 0 180px;
    }
    .top-right {
      width: 220px;
      .el-tooltip {
        display: none;
      }
    }
  }
}
</style>
