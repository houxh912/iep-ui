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
    <div class="top-right">
      <div class="top-title">
        <!-- <div class="top-bar__item top-bar__item--show" v-if="showMenu">
        <top-menu></top-menu>
      </div> -->
        <navbar></navbar>
      </div>
      <div class="top-msg">
        <div class="sss">
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
        <!-- <el-tooltip v-if="this.userInfo.avatar" effect="dark" content="用户头像" placement="bottom">
        <img id="thumbnail" class="top-bar__img" />
      </el-tooltip> -->
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

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenfullscreen, handleImg } from '@/util/util'
// import topMenu from './top-menu'
import navbar from './top-navbar'
// import topSearch from './top-search'
export default {
  components: {
    // topMenu,
    navbar,
    // topSearch,
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
        console.log('选择组织切换')
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
.logo-wrapper {
  margin: 13px 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  .logo-text {
    margin-left: 10px;
    font-size: 18px;
  }
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: rgba(0, 0, 0, 0.65);
  height: 64px;
  box-sizing: border-box;
  white-space: nowrap;
}
.top-left {
  flex: 0 0 240px;
}
.top-right {
  display: flex;
  align-items: center;
  width: 100%;
  // font-family: "黑体";
  .top-title {
    display: block;
    width: 100%;
  }
  .top-msg {
    flex: 0 0 300px;
    display: flex;
    align-items: center;
    > div {
      flex-grow: 1;
    }
    .item {
      display: inline-block;
      padding: 0 10px;
      font-size: 20px;
      position: relative;
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 12px;
        position: absolute;
        top: 2px;
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
    .el-dropdown-link {
      color: #6c6c6c;
    }
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .top-left {
    flex: 0 0 150px;
    .logo-wrapper {
      .logo {
        cursor: pointer;
        width: 45px;
        height: 19px;
        background-image: url("/img/logo.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .logo-text {
        font-size: 14px;
      }
    }
  }
  .top-right {
    .top-title {
    }
    .top-msg {
      flex: 0 0 220px;
    }
  }
}
@media screen and (max-width: 769px) {
  .top-left {
    flex: 0 0 150px;
    .logo-wrapper {
      .logo {
        width: 45px;
        height: 19px;
      }
      .logo-text {
        font-size: 14px;
      }
    }
  }
  .top-right {
    display: block;
    > div {
      display: inline-block;
    }
    .top-title {
      display: inline-block;
      width: 300px;
    }
    .top-msg {
      width: 250px;
      float: right;
    }
  }
}
</style>
