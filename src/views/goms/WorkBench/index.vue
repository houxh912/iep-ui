<template>
  <div class="container">
    <div class="left">
      <div class="top">
        <div class="title">
          <span class="title-span">欢迎您，{{data.realName}}！</span>
          <span>您共有{{data.logList.length}}条消息！</span>
        </div>
        <div class="message">
          <el-alert title="商机对接模块全新上线" type="info"></el-alert>
        </div>
      </div>
      <div class="center">
        <h4>组织动态</h4>
        <div class="">
          <log-list :log-list="data.logList"></log-list>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div><img class="img" :src="data.logo" alt="" id="logo"></div>
        <div class="img-text">{{data.orgName}}</div>
      </div>
      <div class="information">
        <div class="info-text">成员数量：{{data.memberNum}}人（{{data.applyUserNum}}人申请）</div>
        <div class="info-text">部门数量：{{data.deptNum}}个</div>
      </div>
      <div class="manager">
        <p>组织管理员</p>
        <div class="manager-avatar">
          <div class="avatar" v-for="item in managerList" :key="item.userId"><img :src="item.avatar" id="avatar" alt="">{{item.realName}}</div>
        </div>
      </div>
      <div class="function">
        <div class="button-switch">
          <el-switch class="switch" v-model="value1" active-color="#ba1b20"></el-switch>
          <span>允许加入</span><br>
          <span class="span2-button">允许用户申请加入组织</span>
        </div>
        <div class="button-switch">
          <el-switch class="switch" v-model="value2" active-color="#ba1b20"></el-switch>
          <span>开启管理员权限</span><br>
          <span class="span2-button">用户加入组织需通过管理员审核</span>
        </div>
        <div class="button-switch">
          <span>组织邀请码</span><br>
          <span class="span2-button">下载二维码邀请用户加入</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orgDetail } from '@/api/admin/org'
import { handleImg } from '@/util/util'
import LogList from './LogList'
export default {
  components: { LogList },
  data () {
    return {
      value1: true,
      value2: true,
      data: { 'orgName': '杜照鸿的组织', 'logo': 'image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg', 'realName': '超级管理员', 'logList': [{ 'id': 2, 'userId': 8, 'targetUserId': 0, 'time': '2019-02-22 17:11:03', 'description': '$申请加入组织。,张超', 'orgId': 8 }], 'memberNum': 2, 'applyUserNum': 1, 'deptNum': 0, 'managerList': [{ 'userId': 10, 'username': 'duzhaohong', 'realName': '杜照鸿', 'password': '$2a$10$u6D83/lGaENUrMp7FgvDLezaeVSXHUJl3NwgYL/AI26FdYAcA5Ncq', 'safePassword': '', 'createTime': '2019-02-20 11:38:33', 'updateTime': '2019-02-23 16:19:48', 'delFlag': '0', 'lockFlag': '0', 'avatar': 'image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg', 'phone': '11011011011', 'orgId': 8, 'deptId': 13, 'tenantId': 1, 'wxOpenid': null, 'qqOpenid': null }], 'isOpen': 0 },
      formatLogList: [],
      managerList: [],
    }
  },
  created () {
    this.load()

  },
  methods: {
    load () {
      orgDetail().then((res) => {
        this.data = res.data.data
        const logList = res.data.data.logList
        const log = logList.map(m => {
          const str = m.description
          const strArr = str.split(',')
          let templateStr = strArr.shift()
          strArr.forEach(n => {
            templateStr = templateStr.replace(/\$/g, n)
          })
          return templateStr
        })
        console.log(this.data)
        this.formatLogList = log
        this.managerList = this.data.managerList.filter(m => m)
        console.log(this.managerList.avatar)
        handleImg(this.data.logo, 'logo')
        handleImg(this.managerList.avatar, 'avatar')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  background-color: white;
  .left {
    flex: 1;
    margin-left: 20px;
    .top {
      margin-top: 20px;
      margin-bottom: 20px;
      .title-span {
        font-size: 18px;
      }
      .title {
        margin-bottom: 20px;
      }
      .message {
        margin-right: 20px;
      }
    }
  }
  .right {
    background-color: #fafafa;
    border-left: solid 1px #d8d4d4;
    .right-top {
      border-bottom: solid 1px #d8d4d4;
      margin-right: 10px;
      margin-left: 10px;
      margin-top: 40px;
      height: 200px;
      text-align: center;
      .img-text {
        margin-top: 15px;
      }
      .img {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
    }
    .information {
      border-bottom: solid 1px #d8d4d4;
      height: 80px;
      margin-right: 10px;
      margin-left: 10px;
      .info-text {
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .manager {
      border-bottom: solid 1px #d8d4d4;
      margin-right: 10px;
      margin-left: 10px;
      height: 180px;
      .manager-avatar {
        display: flex;
        padding-left: 15px;
        .avatar {
          width: 50px;
          height: 50px;
          margin-top: 25px;
          margin-right: auto;
          text-align: center;
          border-radius: 50%;
          img {
            width: 100%;
          }
        }
      }
    }
    .function {
      margin-left: 20px;
      margin-bottom: 20px;
      .button-switch {
        margin-top: 15px;
      }
      .span2-button {
        color: #beb4b4;
        font-size: 12px;
      }
      .switch {
        float: right;
        margin-right: 20px;
      }
    }
  }
}
</style>
