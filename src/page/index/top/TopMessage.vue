<template>
  <div class="nav-info">
    <el-popover popper-class="msg-popover" placement="bottom" width="336" trigger="click">
      <el-tabs class="msg-tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="`通知 (${announcementNum})`" name="first">
          <el-card class="box-card" :body-style="bodyStyle">
            <div v-for="item in announcementList" :key="item.id" class="text">
              <div class="list-item-content">
                <h4 class="list-item-title">{{ item.name }}</h4>
                <div class="list-item-description">
                  <span class="time">{{ item.time }}</span>
                </div>
              </div>
            </div>
            <div class="list-loadMore">更多</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="`消息 (${systemMessageNum})`" name="second">
          <el-card class="box-card" :body-style="bodyStyle">
            <div v-for="item in systemMessageList" :key="item.id" class="text">
              <div class="list-item-content">
                <h4 class="list-item-title">{{ item.name }}</h4>
                <div class="list-item-description">
                  <span class="time">{{ item.time }}</span>
                </div>
              </div>
            </div>
            <div class="list-loadMore">更多</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="`邮件 (${emailNum})`" name="third">
          <el-card class="box-card" :body-style="bodyStyle">
            <div v-for="item in emailList" :key="item.id" class="text">
              <div class="list-item-content">
                <h4 class="list-item-title">{{ item.name }}</h4>
                <div class="list-item-description">
                  <span class="time">{{ item.time }}</span>
                </div>
              </div>
            </div>
            <div class="list-loadMore">更多</div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="list-clear">清空 通知</div> -->
      <el-badge :value="totalNum" slot="reference" class="item">
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
      // announcementList: [{id: 2, name: "集团研发中心关于进一步完善研发计划的通知", time: "2019-03-29 16:42:04"}]
      // announcementNum: 1
      // emailList: [{id: 46, name: "分享材料all", time: "2019-03-28 11:37:44"},…]
      // emailNum: 3
      // systemMessageList: [{id: 9, name: "11111", time: "2019-03-16 15:38:28"},…]
      // systemMessageNum: 4
      // totalNum: 8
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    loadPage () {
      getImsWel().then(({ data }) => {
        console.log(data)
        this.totalNum = data.totalNum
        this.announcementList = data.announcementList
        this.announcementNum = data.announcementNum
        this.emailList = data.emailList
        this.emailNum = data.emailNum
        this.systemMessageList = data.systemMessageList
        this.systemMessageNum = data.systemMessageNum
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
  left: 40px;
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
    border-bottom: 1px solid #eceef5;
    // .list-item-icon {
    //   margin-top: 5px;
    //   margin-right: 16px;
    //   width: 32px;
    //   height: 32px;
    //   img {
    //     display: block;
    //     width: 100%;
    //   }
    //   i {
    //     font-size: 20px;
    //   }
    // }
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
  .list-loadMore {
    padding: 8px 0;
    color: #409eff;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #66b1ff;
    }
  }
}
</style>
