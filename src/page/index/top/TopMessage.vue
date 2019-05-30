<template>
  <el-popover popper-class="msg-popover" placement="bottom" width="336" v-model="visible" trigger="click">
    <a-spin :spinning="pageLoading">
      <el-tabs class="msg-tabs" v-model="activeName">
        <el-tab-pane :label="`公告 (${announcementList.length || 0})`" name="first">
          <iep-top-message-box :message-list="announcementList" :type="0" @visible="visible=false"></iep-top-message-box>
        </el-tab-pane>
        <el-tab-pane :label="`消息 (${systemMessageList.length || 0})`" name="second">
          <iep-top-message-box :message-list="systemMessageList" :type="1" @visible="visible=false"></iep-top-message-box>
        </el-tab-pane>
        <el-tab-pane :label="`邮件 (${emailList.length || 0})`" name="third">
          <iep-top-message-box :message-list="emailList" :type="2" @visible="visible=false"></iep-top-message-box>
        </el-tab-pane>
      </el-tabs>
    </a-spin>
    <!-- <div class="list-clear">清空 通知</div> -->
    <el-badge :hidden="!totalNum" :value="totalNum" slot="reference" class="item">
      <iep-button><i class="el-icon-bell"></i></iep-button>
    </el-badge>
  </el-popover>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getImsWel } from '@/api/ims/email'
import IepTopMessageBox from './Components/MessageBox'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  components: { IepTopMessageBox },
  data () {
    return {
      pageLoading: true,
      visible: false,
      activeName: 'first',
      socket: null,
      stompClient: null,
    }
  },
  computed: {
    ...mapState({
      announcementList: state => state.notify.announcementList,
      announcementNum: state => state.notify.announcementNum,
      emailList: state => state.notify.emailList,
      emailNum: state => state.notify.emailNum,
      systemMessageList: state => state.notify.systemMessageList,
      systemMessageNum: state => state.notify.systemMessageNum,
    }),
    ...mapGetters([
      'access_token',
      'userInfo',
    ]),
    totalNum () {
      return this.announcementNum + this.emailNum + this.systemMessageNum
    },
  },
  created () {
    this.loadPage()
    // this.initWebSocket()
  },
  destroyed () {
    clearInterval(this.timer)
    this.disconnect()
  },
  methods: {
    ...mapActions(['UpdatePushNotify', 'SetNotify']),
    disconnect () {
      if (this.stompClient != null) {
        this.stompClient.disconnect()
        console.log('Disconnected')
      }
    },
    connection () {
      let token = this.access_token
      let userInfo = this.userInfo
      let headers = {
        'Authorization': 'Bearer ' + token,
      }
      // 建立连接对象
      this.socket = new SockJS('/api/ims/ws')//连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.debug = null
      // 向服务器发起websocket连接
      this.stompClient.connect(headers, () => {
        this.stompClient.subscribe(`/self/notify/${userInfo.userId}`, (data) => { // 订阅服务端提供的某个topic;
          this.UpdatePushNotify(data)
        })
      }, () => { })
    },
    initWebSocket () {
      this.connection()
      let self = this
      //断开重连机制,尝试发送消息,捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          self.stompClient.send('test')
        } catch (err) {
          console.log('断线了: ' + err)
          self.connection()
        }
      }, 5000)
    },
    loadPage () {
      this.pageLoading = true
      getImsWel().then(({ data }) => {
        this.SetNotify(data)
        this.pageLoading = false
      })
    },
  },
}
</script>
<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  top: 20px;
  right: 22px;
}
.msg-popover >>> .el-popover {
  right: 0;
}
.msg-tabs >>> .el-tabs__nav {
  width: 100%;
  text-align: center;
}
.msg-tabs >>> .el-tabs__active-bar {
  left: 30px;
  width: 70px !important;
}
.msg-tabs >>> .el-tabs__header {
  margin-bottom: 0;
}
.msg-tabs >>> .el-card__body {
  overflow: auto;
}
.msg-tabs >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 8px;
  background-color: #fff;
}
.msg-tabs >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.msg-tabs >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
</style>
<style lang="scss" scoped>
.item {
  position: relative;
  margin-right: 20px;
  button {
    border: 0;
    height: 60px;
    i {
      font-size: 20px;
    }
    &:focus,
    &:hover {
      background-color: #eee;
      color: #333;
    }
  }
}
.list-clear {
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-top: 1px solid #eceef5;
  color: #999;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #666;
  }
}
</style>
