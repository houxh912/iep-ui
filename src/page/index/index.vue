<template>
  <div class="avue-contail">
    <im-ui></im-ui>
    <el-container style="height: 100vh;">
      <el-header style="height: 60px;padding: 0;z-index: 500;">
        <!-- 顶部导航栏 -->
        <top></top>
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <sidebar v-if="!IS_ICAN"></sidebar>
        <ican-sidebar v-if="IS_ICAN"></ican-sidebar>
        <el-main>
          <!-- 主体视图层 -->
          <el-scrollbar ref="elscrollbar" style="height:100%">
            <keep-alive>
              <router-view ref="wrap" class="avue-view" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <router-view ref="wrap" class="avue-view" v-if="!$route.meta.keepAlive" />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <dialog-group></dialog-group>
  </div>
</template>

<script>
import DialogGroup from './DialogGroup'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Top from './Top/'
import Sidebar from './Sidebar/'
import IcanSidebar from './IcanSidebar/'
import imUi from '@/views/imui'
import { validatenull } from '@/util/validate'

export default {
  components: {
    Top,
    Sidebar,
    IcanSidebar,
    DialogGroup,
    imUi,
  },
  name: 'Index',
  data () {
    return {
      // eslint-disable-next-line
      IS_ICAN,
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: '',
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'expires_in',
      'access_token',
    ]),
    asideDisplay () {
      if (this.$route.matched[0].path === '/app') {
        return false
      }
      return true
    },
  },
  created () {
    // 实时检测刷新token
    this.handleRefreshToken()
  },
  destroyed () {
    clearInterval(this.refreshTime)
  },
  mounted () {
    this.init()
    this.LoadContactsPyGroup()
    this.LoadFamsConfig()
  },
  methods: {
    ...mapActions(['LoadContactsPyGroup', 'LoadFamsConfig', 'RefreshToken']),
    ...mapMutations({ setScreen: 'SET_SCREEN', setExpiresIn: 'SET_EXPIRES_IN', setWindowSize: 'SET_WINDOWSIZE' }),
    handleOk () {
      this.visible = false
    },
    // 屏幕检测
    init () {
      this.setWindowSize({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      })
      window.onresize = () => {
        setTimeout(() => {
          this.setWindowSize({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          })
        }, 0)
      }
      // 监听调转路由时EventBus操作
      this.$eventBus.$on('SET_SCROLLTOTOP', () => {
        this.$nextTick(() => {
          this.$refs['elscrollbar'].$refs['wrap'].scrollTop = 0
        })
      })
    },
    // 实时检测刷新token
    handleRefreshToken () {
      this.refreshTime = setInterval(() => {
        const token = this.access_token
        if (validatenull(token)) {
          return
        }
        if (this.expires_in <= 1000 && !this.refreshLock) {
          this.refreshLock = true
          this.RefreshToken().catch(() => {
            clearInterval(this.refreshTime)
          })
          this.refreshLock = false
        }
        this.setExpiresIn(this.expires_in - 10)
      }, 10000)
    },
  },
}
</script>

<style lang="scss" scoped>
.avue-contail ::v-deep .el-main {
  padding: 0;
  overflow-x: hidden;
  height: calc(100vh - 60px);
}
.avue-contail ::v-deep .el-tabs__item {
  height: 40px !important;
  line-height: 40px !important;
}
.avue-contail ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-contail ::v-deep .el-scrollbar {
  width: 100%;
}
.avue-contail ::v-deep .el-scrollbar__view {
  height: 100%;
}
</style>
