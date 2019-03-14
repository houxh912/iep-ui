<template>
  <div class="nav-info">
    <el-badge :value="12" class="item">
      <iep-button plain @click="visible = !visible"><i class="iconfont icon-xiaoxi2"></i></iep-button>
      <el-popover placement="bottom" width="336" trigger="manual" v-model="visible">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="通知 (4)" name="first">
            <el-card class="box-card">
              <div v-for="msg in msgList" :key="msg.id" class="text">
                <div class="list-item-icon">
                  <img :src="msg.img" alt="" />
                </div>
                <div class="list-item-content">
                  <h4 class="list-item-title">{{ msg.title }}</h4>
                  <div class="list-item-description">
                    <span class="time">{{ msg.time }}</span>
                  </div>
                </div>
              </div>
              <div class="list-loadMore">加载更多</div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="消息 (5)" name="second">
            <el-card class="box-card">
              <div v-for="info in infoList" :key="info.id" class="text">
                <div class="list-item-content">
                  <h4 class="list-item-title">{{ info.title }}</h4>
                  <div class="list-item-description">
                    <span class="time">{{ info.time }}</span>
                  </div>
                </div>
              </div>
              <div class="list-loadMore">加载更多</div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="邮件 (3)" name="third">
            <el-card class="box-card">
              <div v-for="mail in mailList" :key="mail.id" class="text">
                <div class="list-item-icon">
                  <i class="iconfont icon-youxiang"></i>
                </div>
                <div class="list-item-content">
                  <h4 class="list-item-title">{{ mail.title }}</h4>
                  <div class="list-item-description">
                    <span class="time">{{ mail.time }}</span>
                  </div>
                </div>
              </div>
              <div class="list-loadMore">加载更多</div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
        <div class="list-clear">清空 通知</div>
      </el-popover>
    </el-badge>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      activeName: 'first',
      msgList: [
        {
          id: '1',
          img: '../img/icons/info.png',
          title: '你收到了 14 份新周报',
          time: '1天前',
        },
        {
          id: '2',
          img: '../img/icons/ms.png',
          title: '你推荐的 张一山 已通过第三轮面试',
          time: '1天前',
        },
        {
          id: '3',
          img: '../img/icons/jia.png',
          title: '你推荐的 张一山 已通过第三轮面试',
          time: '1天前',
        },
        {
          id: '4',
          img: '../img/icons/xing.png',
          title: '你推荐的 张一山 已通过第三轮面试',
          time: '1天前',
        },
      ],
      infoList: [
        {
          id: '1',
          title: '产品中心视效组20190310早会纪要分享',
          time: '2019-3-10 08:40',
        },
        {
          id: '2',
          title: '产品中心视效组20190312早会纪要分享',
          time: '2019-3-13 09:40',
        },
        {
          id: '3',
          title: '产品中心视效组20190302早会纪要分享',
          time: '2019-3-02 10:20',
        },
        {
          id: '4',
          title: '产品中心视效组20190310早会纪要分享',
          time: '2019-3-10 10:40',
        },
      ],
      mailList: [
        {
          id: '1',
          title: '关于加快熟悉全国数字政府建设工作情况的简报学习',
          time: '2019-3-10 08:40',
        },
        {
          id: '2',
          title: '22关于加快熟悉全国数字政府建设工作情况的简报学习',
          time: '2019-3-10 08:40',
        },
        {
          id: '3',
          title: '11关于加快熟悉全国数字政府建设工作情况的简报学习',
          time: '2019-3-10 08:40',
        },
        {
          id: '4',
          title: '33关于加快熟悉全国数字政府建设工作情况的简报学习',
          time: '2019-3-10 08:40',
        },
      ],
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
  },
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 0;
  padding: 0;
  font-weight: 400;
}
.nav-info {
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
    .el-card {
      border: 0;
      .text {
        display: flex;
        flex: 1 1;
        align-items: flex-start;
        padding: 20px;
        border-bottom: 1px solid #eceef5;
        .list-item-icon {
          margin-top: 5px;
          margin-right: 16px;
          width: 32px;
          height: 32px;
          img {
            display: block;
            width: 100%;
          }
          i {
            font-size: 20px;
          }
        }
        .list-item-content {
          flex: 1 0;
          .list-item-title {
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
  }
}
</style>
<style scoped>
.nav-info >>> .el-badge__content.is-fixed {
  top: 20px;
  right: 22px;
}
.nav-info >>> .el-popover {
  right: 0;
}
.nav-info >>> .el-tabs__nav {
  width: 100%;
  text-align: center;
}
.nav-info >>> .el-tabs__active-bar {
  left: 40px;
  width: 70px !important;
}
.nav-info >>> .el-card__body {
  padding: 0 !important;
}
.nav-info >>> .el-tabs__header {
  margin-bottom: 0;
}
.nav-info >>> .el-card__body {
  height: 360px;
  overflow: auto;
}
.nav-info >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 8px;
  background-color: #fff;
}
.nav-info >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.nav-info >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
</style>