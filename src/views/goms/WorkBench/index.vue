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
          <img class="img" :src="data.logo" alt="" id="logo"/>
        </div>
        <div class="img-text">{{data.orgName}}</div>
      </div>
      <div class="information">
        <div class="info-text"><i class="icon-chengyuan"></i><span>成员数量：{{data.memberNum}}人（{{data.applyUserNum}}人申请）</span></div>
        <div class="info-text"><i class="icon-zuzhi"></i><span>部门数量：{{data.deptNum}}个</span></div>
      </div>
      <div class="manager">
        <p>组织管理员</p>
        <div class="manager-avatar ">
          <div class="avatar" v-for="(item,index) in managerList" :key="item.userId">
            <img class="avatar-img" :src="item.avatar" :id="`avatar${index}`" alt="" @click="open2(item.userId)">{{item.realName}}
          </div>
        </div>
      </div>
      <div class="function">
        <div class="button-switch">
          <!-- <el-form-item label="允许加入" prop="isOpen">
            <el-switch class="switch" v-model="data.isOpen" :active-value="0" :inactive-value="1"></el-switch>
          </el-form-item> -->
          <el-switch class="switch" v-model="data.isOpen" :active-value="0" :inactive-value="1" active-color="#ba1b20">
          </el-switch>
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
  </div>
</template>
<script>
import { orgDetail, gomsOpen, unSetManager } from '@/api/admin/org'
import { handleImg } from '@/util/util'
import LogList from './LogList'
// import IepImg from './Img'
import take from 'lodash/take'
export default {
  components: { LogList },
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
    this.load()
  },
  watch: {
    'data.isOpen' () {
      gomsOpen()
    },
  },
  methods: {
    open2 (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        unSetManager(row).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.load()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    handleListMore () {
      this.isListMore = true
      this.tenLogList = this.data.logList
    },
    load () {
      orgDetail().then((res) => {
        this.data = res.data.data
        this.tenLogList = take(res.data.data.logList, 15)
        this.managerList = this.data.managerList.filter(m => m)
        this.managerList.forEach((m, i) => {
          handleImg(m.avatar, 'avatar' + i)
        })
        handleImg(this.data.logo, 'logo')
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
        font-size: 18px;
      }
      .message {
        margin-right: 20px;
      }
    }
  }
  .center {
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
          color: #bf051a;
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
    background-color: #fafafa;
    border-left: solid 1px #d8d4d4;
    flex: 0 0 240px;
    .right-top {
      border-bottom: solid 1px #d8d4d4;
      margin:0 20px 20px;
      text-align: center;
      .img-text {
        margin: 15px 0;
        font-size: 14px;
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
      height: 180px;
      overflow: hidden;
      .manager-avatar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .avatar {
          margin-right: 10px;
          margin-bottom: 10px;
          width: 50px;
          height: 50px;
          font-size: 14px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #d7d7d7;
          .avatar-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
    .function {
      margin: 20px;
      .button-switch {
        margin-top: 15px;
          span {
            font-size: 14px;
          }
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
        color: #beb4b4;
        font-size: 12px;
      }
      .switch {
        float: right;
    }
  }
}
</style>
