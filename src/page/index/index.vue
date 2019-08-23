<template>
  <div class="avue-contail">
    <im-ui v-if="$store.getters.userInfo.userId != 1" v-show="isExperimental"></im-ui>
    <el-container style="height: 100vh;">
      <el-header style="height: 60px;padding: 0;z-index: 500;">
        <!-- 顶部导航栏 -->
        <top />
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <sidebar />
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import top from './top/'
import sidebar from './sidebar/'
//import admin from '@/util/admin'
import imUi from '@/views/imui'
import { validatenull } from '@/util/validate'
// import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
// import store from '@/store'

export default {
  components: {
    top,
    sidebar,
    DialogGroup,
    imUi,
  },
  name: 'Index',
  data () {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: '',
    }
  },
  computed: {
    ...mapState({
      isExperimental: state => state.common.isExperimental,
    }),
    ...mapGetters([
      'userInfo',
      'isLock',
      'website',
      // 'expires_in',
    ]),
    asideDisplay () {
      if (this.$route.matched[0].path === '/app') {
        return false
      }
      return true
    },
  },
  created () {
    //实时检测刷新token
    this.handleRefreshToken()
  },
  destroyed () {
    // console.log("销毁")
    // console.log(this.refreshTime)
    clearInterval(this.refreshTime)
    // this.disconnect()
  },
  mounted () {
    this.init()
    this.LoadContactsPyGroup()
    this.LoadFamsConfig()
    // this.initWebSocket()
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
      // this.setScreen(admin.getScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.setWindowSize({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          })
          // this.setScreen(admin.getScreen())
        }, 0)
      }
      // 监听调转路由时Vuex操作
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'SET_SCROLLTOTOP') {
          const scrollBar = this.$refs['elscrollbar']
          const wrap = scrollBar.$refs['wrap']
          wrap.scrollTop = 0
        }
      })
    },
    // 实时检测刷新token
    handleRefreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: 'access_token',
          debug: true,
        })
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
    // initWebSocket () {
    //   this.connection()
    //   let self = this
    //   //断开重连机制,尝试发送消息,捕获异常发生时重连
    //   this.timer = setInterval(() => {
    //     try {
    //       self.stompClient.send('test')
    //     } catch (err) {
    //       console.log('断线了: ' + err)
    //       self.connection()
    //     }
    //   }, 5000)
    // },
    // connection () {
    //   let token = store.getters.access_token
    //   let TENANT_ID = getStore({ name: 'tenantId' })
    //   let headers = {
    //     Authorization: 'Bearer ' + token,
    //   }
    //   // 建立连接对象
    //   this.socket = new SockJS('/api/act/ws') //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
    //   // 获取STOMP子协议的客户端对象
    //   this.stompClient = Stomp.over(this.socket)

    //   // 向服务器发起websocket连接
    //   this.stompClient.connect(
    //     headers,
    //     () => {
    //       this.stompClient.subscribe(
    //         '/task/' + this.userInfo.username + '-' + TENANT_ID + '/remind',
    //         msg => {
    //           // 订阅服务端提供的某个topic;
    //           this.$notify({
    //             title: '协同提醒',
    //             type: 'warning',
    //             dangerouslyUseHTMLString: true,
    //             resources: msg.body + '任务，请及时处理',
    //             offset: 60,
    //           })
    //         }
    //       )
    //     },
    //     () => { }
    //   )
    // },
    // disconnect () {
    //   if (this.stompClient != null) {
    //     this.stompClient.disconnect()
    //     console.log('Disconnected')
    //   }
    // },
  },
}
</script>

<style lang="css" scoped>
.avue-contail >>> .el-main {
  padding: 0;
  overflow-x: hidden;
  height: calc(100vh - 60px);
}
.avue-contail >>> .el-tabs__item {
  height: 40px !important;
  line-height: 40px !important;
}
.avue-contail >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-contail >>> .el-scrollbar {
  width: 100%;
}
.avue-contail >>> .el-scrollbar__view {
  height: 100%;
}
</style>
