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
        <h4><span>组织动态</span><span class="notes">新申请<i>11</i></span></h4>
        <div class="con">
          <log-list :log-list="tenLogList"></log-list>
          <el-button class="text-btn" v-if="!isListMore && data.logList.length>15" @click="handleListMore" type="text">展开更多>>></el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div class="logo-item">
          <iep-img class="img" :src="data.logo"></iep-img>
        </div>
        <div class="img-text">{{data.orgName}}<i class="el-icon-arrow-down el-icon--right"></i></div>
      </div>
      <div class="information">
        <div class="info-text"><i class="icon-chengyuan"></i><span>成员数量：{{data.memberNum}}人（{{data.applyUserNum}}人申请）</span></div>
        <div class="info-text"><i class="icon-zuzhi"></i><span>部门数量：{{data.deptNum}}个</span></div>
      </div>
      <div class="manager">
        <p>组织管理员</p>
        <div class="manager-avatar">
          <div class="avatar" v-for="(item) in managerList" :key="item.userId">
            <div class="avater-mask" @click="handleUnsetAdmin(item.userId)"><i class="el-icon-close close"></i></div>
            <iep-img class="avatar-img" :src="item.avatar || ''"></iep-img>
            <span class="avatar-name">{{item.realName}}</span>
          </div>
          <div class="avatar avatar-add" @click="handleAddAdminDialog">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <div class="function">
        <div class="button-switch">
          <el-switch class="switch" :value="data.isOpen" :active-value="0" :inactive-value="1" active-color="#ba1b20" @click.native="handleSwitch"></el-switch>
          <span>允许加入</span><br>
          <span class="span2-button">允许用户申请加入组织</span>
        </div>
        <div class="button-switch">
          <el-switch class="switch" v-model="value2" active-color="#ba1b20"></el-switch>
          <span>开启管理员权限</span><br>
          <span class="span2-button">用户加入组织需通过管理员审核</span>
        </div>
        <div class="button-switch clearfix">
          <div class="switch-text">
            <span>组织邀请码</span><br>
            <span class="span2-button">下载二维码邀请用户加入</span>
          </div>
          <img class="code" src="" alt="">
        </div>
      </div>
    </div>
    <add-admin-dialog ref="AddAdminDialog" @load-page="loadPage"></add-admin-dialog>
  </div>
</template>
<script>
import AddAdminDialog from './AddAdminDialog'
import { orgDetail, gomsOpen, unSetManager, setManager } from '@/api/admin/org'
import LogList from './LogList'
import take from 'lodash/take'
export default {
  components: { LogList, AddAdminDialog },
  data () {
    return {
      value2: true,
      isListMore: false,
      tenLogList: [],
      data: { 'orgName': '', 'logo': '', 'realName': '', 'logList': [], 'memberNum': 0, 'applyUserNum': 0, 'deptNum': 0, 'managerList': [], 'isOpen': 0 },
      managerList: [],
      show: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAddAdminDialog () {
      this.$refs['AddAdminDialog'].formRequestFn = setManager
      this.$refs['AddAdminDialog'].dialogShow = true
    },
    handleSwitch () {
      gomsOpen().then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.data.isOpen = 1 - this.data.isOpen
        } else {
          this.$message({
            message: data.msg,
            type: 'warning',
          })
        }
      })
    },
    handleUnsetAdmin (id) {
      unSetManager(id).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.loadPage()
        } else {
          this.$message({
            message: data.msg,
            type: 'warning',
          })
        }
      })
    },
    handleListMore () {
      this.isListMore = true
      this.tenLogList = this.data.logList
    },
    loadPage () {
      orgDetail().then((res) => {
        this.data = res.data.data
        this.tenLogList = take(res.data.data.logList, 15)
        this.managerList = this.data.managerList.filter(m => m)
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
    .top {
      margin-top: 20px;
      margin-bottom: 20px;
      .title-span {
        font-size: 18px;
      }
      .title {
        margin-bottom: 20px;
        font-size: 18px;
      }
      .message {
        margin-right: 20px;
      }
    }
  }
  .center {
    height: 100%;
    h4 {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 400;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .notes {
        margin: 0 10px;
        border-radius: 10px;
        padding: 2px 10px;
        font-size: 12px;
        color: #666;
        background-color: #f4f4f5;
        i {
          margin-left: 2px;
          font-style: normal;
          color: #cb3737;
        }
      }
    }
    .con {
      font-size: 14px;
      color: #666;
      .text-btn {
        color: #999;
        &:hover,
        &:focus {
          color: #ccc;
        }
      }
    }
  }
  .right {
    padding: 20px 0;
    height: 100%;
    background-color: #fafafa;
    border-left: solid 1px #d8d4d4;
    flex: 0 0 240px;
    .right-top {
      border-bottom: solid 1px #d8d4d4;
      margin: 0 20px 20px;
      text-align: center;
      .img-text {
        margin: 15px 0;
        font-size: 14px;
        cursor: pointer;
        i {
          color: #6c6c6c;
        }
      }
      .logo-item {
        padding: 30px 40px;
        border: 1px solid #d7d7d7;
        background-color: #fff;
        .img {
          display: block;
          height: 60px;
          margin: 0 auto;
        }
      }
    }
    .information {
      border-bottom: solid 1px #d8d4d4;
      height: 80px;
      margin-right: 10px;
      margin-left: 10px;
      .info-text {
        margin: 10px;
        font-size: 14px;
        color: #666;
        i {
          display: inline-block;
          margin-right: 5px;
          font-size: 18px;
          vertical-align: middle;
          color: #999;
        }
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .manager {
      border-bottom: solid 1px #d8d4d4;
      margin-right: 10px;
      margin-left: 10px;
      overflow: hidden;
      .manager-avatar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .avatar {
          position: relative;
          margin-right: 10px;
          margin-bottom: 10px;
          width: 50px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          &:hover {
            .avatar-name {
              opacity: 0.7;
            }
            .avater-mask {
              opacity: 1;
            }
          }
          .avatar-name {
            display: block;
            width: 100%;
          }
          .avatar-img {
            border: 1px solid #d7d7d7;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .avater-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.6);
            opacity: 0;
            .close {
              position: absolute;
              top: -3px;
              right: -3px;
              width: 15px;
              height: 15px;
              line-height: 15px;
              border-radius: 50%;
              background-color: #cb3737;
              color: #fff;
              font-size: 12px;
              &:hover {
                background-color: #fb5966;
              }
            }
          }
        }
        .avatar-add {
          height: 50px;
          border: 1px solid #d7d7d7;
          border-radius: 50%;
          color: #999;
          outline: none;
          i {
            font-size: 24px;
            line-height: 50px;
          }
          &:hover {
            background-color: #d7d7d7;
            color: #666;
          }
        }
      }
    }
    .function {
      margin: 20px;
      .button-switch {
        margin-top: 15px;
        .switch-text {
          float: left;
        }
        .code {
          float: right;
          width: 30px;
          height: 30px;
        }
      }
    }
    .span2-button {
      color: #999;
      font-size: 12px;
    }
    .switch {
      float: right;
    }
  }
}
</style>
