<template>
  <div class="avue-contail" :class="{ 'avue--collapse': isCollapse }">
    <el-container style="height: 100vh;">
      <el-header style="height: 60px;padding: 0;z-index: 500;">
        <!-- 顶部导航栏 -->
        <top />
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <!-- 左侧导航栏 -->
          <sidebar />
        </el-aside>
        <el-main>
          <!-- 顶部标签卡 -->
          <tags />
          <!-- 主体视图层 -->
          <el-scrollbar style="height:100%">
            <keep-alive>
              <router-view class="avue-view" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <router-view class="avue-view" v-if="!$route.meta.keepAlive" />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <div class="avue-shade" @click="showCollapse"></div>
    <a-modal title="欢迎您加盟国脉内部智慧平台" v-model="visible" @ok="handleOk">
      <p>欢迎登录国脉内部智慧平台，我们将为您提供工作、学习、（自我）管理、协作、个人财富增值和服务创新等一系列服务，将为你的工作与学习带来系列惊喜的变化。请您准确、全面填写好相关信息，了解好平台运营规则，学习新生必读相关材料。本平台是内部资源的汇聚与分享，许多材料和功能限于您个人使用，请注意保密，保管好您的账号密码和财富。</p>
      <p>祝您通过平台获得观念进步、技能提升和财富增值!</p>
    </a-modal>
  </div>
</template>

<script>
import displayMixins from '@/mixins/displayMixins'
import { mapGetters, mapActions } from 'vuex'
import tags from './tags'
import top from './top/'
import sidebar from './sidebar/'
import admin from '@/util/admin'
import { validatenull } from '@/util/validate'
// import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
// import store from '@/store'

export default {
  mixins: [displayMixins],
  components: {
    top,
    tags,
    sidebar,
  },
  name: 'Index',
  data () {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: '',
      visible: true,
    }
  },
  created () {
    //实时检测刷新token
    // this.refreshToken()
  },
  destroyed () {
    // console.log("销毁")
    // console.log(this.refreshTime)
    clearInterval(this.refreshTime)
    // this.disconnect()
  },
  mounted () {
    // this.init()
    this.LoadAllDictMap()
    // this.initWebSocket()
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'isLock',
      'isCollapse',
      'website',
      // 'expires_in',
    ]),
    asideWidth () {

      if (this.$route.matched[0].path === '/app') {
        return '0px'
      }
      if (this.isDesktop()) {
        return '200px'
      } else {
        return '64px'
      }
    },
  },
  props: [],
  methods: {
    ...mapActions(['LoadAllDictMap']),
    handleOk () {
      this.visible = false
    },
    showCollapse () {
      this.$store.commit('SET_COLLAPSE')
    },
    // 屏幕检测
    init () {
      this.$store.commit('SET_SCREEN', admin.getScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', admin.getScreen())
        }, 0)
      }
    },
    // 实时检测刷新token
    refreshToken () {
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
          this.$store.dispatch('RefreshToken').catch(() => {
            clearInterval(this.refreshTime)
          })
          this.refreshLock = false
        }
        this.$store.commit('SET_EXPIRES_IN', this.expires_in - 10)
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
<style lang="scss" scoped>
.el-aside {
  overflow: hidden;
  // border-right: 1px solid #eee;
  background-color: #fafafa;
}
</style>
<style lang="css" scoped>
.avue-contail >>> .el-main {
  padding: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  height: calc(100vh - 60px);
}
.avue-contail >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
