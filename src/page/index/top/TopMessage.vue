<template>
  <div class="nav-info">
    <el-popover popper-class="msg-popover" placement="bottom" width="336" v-model="visible" trigger="click">
      <a-spin :spinning="pageLoading">
        <el-tabs class="msg-tabs" v-model="activeName">
          <el-tab-pane :label="`公告 (${announcementNum})`" name="first">
            <el-card class="box-card" :body-style="bodyStyle">
              <iep-no-data v-if="!announcementList.length" message="暂无通知"></iep-no-data>
              <div v-for="item in announcementList" :key="item.id" class="text">
                <div class="list-item-content">
                  <h4 class="list-item-title" @click="handleAnnouncementDetail(item)">{{ item.name }}</h4>
                  <div class="list-item-description">
                    <span class="time">{{ item.time | formatTime }}</span>
                  </div>
                </div>
              </div>
              <div class="msg-footer">
                <iep-button type="text" @click="handleOpen('/wel/message/announcement')">查看更多</iep-button>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="`消息 (${systemMessageNum})`" name="second">
            <el-card class="box-card" :body-style="bodyStyle">
              <iep-no-data v-if="!systemMessageList.length" message="暂无消息"></iep-no-data>
              <div v-for="item in systemMessageList" :key="item.id" class="text">
                <div class="list-item-content">
                  <h4 class="list-item-title" @click="handleSystemMessageDetail(item)">{{ item.name }}</h4>
                  <div class="list-item-description">
                    <span class="time">{{ item.time | formatTime }}</span>
                  </div>
                </div>
              </div>
              <div class="msg-footer">
                <iep-button type="text" @click="handleOpen('/wel/message/system_message')">查看更多</iep-button>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="`邮件 (${emailNum})`" name="third">
            <el-card class="box-card" :body-style="bodyStyle">
              <iep-no-data v-if="!emailList.length" message="暂无邮件"></iep-no-data>
              <div v-for="item in emailList" :key="item.id" class="text">
                <div class="list-item-content">
                  <h4 class="list-item-title">{{ item.name }}</h4>
                  <div class="list-item-description">
                    <span class="time">{{ item.time | formatTime }}</span>
                  </div>
                </div>
              </div>
              <div class="msg-footer">
                <iep-button type="text" @click="handleOpen('/wel/mail/inbox')">查看更多</iep-button>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </a-spin>
      <!-- <div class="list-clear">清空 通知</div> -->
      <el-badge :hidden="!totalNum" :value="totalNum" slot="reference" class="item">
        <iep-button><i class="el-icon-bell"></i></iep-button>
      </el-badge>
    </el-popover>
  </div>
</template>
<script>
import { getImsWel } from '@/api/ims/email'
export default {
  data () {
    return {
      pageLoading: true,
      visible: false,
      bodyStyle: {
        padding: 0,
      },
      activeName: 'first',
      announcementList: [],
      announcementNum: 0,
      systemMessageList: [],
      systemMessageNum: 0,
      emailList: [],
      emailNum: 0,
      totalNum: 0,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAnnouncementDetail (row) {
      this.$router.push({
        path: '/ims_spa/announcement_detail',
        query: {
          id: row.id,
        },
      })
      this.visible = false
    },
    handleSystemMessageDetail (row) {
      this.$router.push({
        path: '/ims_spa/system_message_detail',
        query: {
          id: row.id,
        },
      })
      this.visible = false
    },
    handleOpen (url) {
      this.$openPage(url)
      this.visible = false
    },
    loadPage () {
      this.pageLoading = true
      getImsWel().then(({ data }) => {
        this.totalNum = data.totalNum
        this.announcementList = data.announcementList
        this.announcementNum = data.announcementNum
        this.emailList = data.emailList
        this.emailNum = data.emailNum
        this.systemMessageList = data.systemMessageList
        this.systemMessageNum = data.systemMessageNum
        this.pageLoading = false
      })
    },
  },
  watch: {
    visible (n) {
      if (n) {
        this.loadPage()
      }
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
h4 {
  margin: 0;
  padding: 0;
  font-weight: 400;
}
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
.box-card {
  border: 0;
  .text {
    display: flex;
    flex: 1 1;
    align-items: flex-start;
    padding: 20px;
    .list-item-content {
      flex: 1 0;
      .list-item-title {
        cursor: pointer;
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 22px;
      }
      .list-item-description {
        color: #999;
        font-size: 12px;
        line-height: 22px;
      }
    }
  }
}
.msg-footer {
  border-top: 1px solid #eceef5;
  text-align: center;
}
</style>
