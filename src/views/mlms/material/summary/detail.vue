<template>
  <div class="detail-page">

    <div class="head">
      <div class="left">
        <div class="title">
          2019年一号工程启动会
        </div>
        <div class="tag">
          <el-tag type="info" v-for="(item, index) in formData.list" :key="index">{{item.name}}</el-tag>
        </div>
      </div>
      <div class="right">
        <iep-button @click="back">返回</iep-button>
      </div>
    </div>

    <div class="detail">
      <div class="content">
        <h3 class="title">会议内容</h3>
        <pre>{{formData.meetingContent}}</pre>
      </div>
      <div class="content">
        <h3 class="title">会议总结</h3>
        <pre>{{formData.meetingCon}}</pre>
      </div>
      <div class="content">
        <h3 class="title">感想与困惑</h3>
        <pre>{{formData.thoughtsProblem}}</pre>
      </div>
    </div>

    <div class="comment">
      <div class="form">
        <h2 class="title">补充或评论</h2>
        <el-input type="textarea" rows=5></el-input>
        <div class="button">
          <iep-button type="danger" @click="submit">发送</iep-button>
        </div>
      </div>
      <div class="list">
        <div class="img">
          <img src="/img/logo.png" alt="">
        </div>
        <div class="info">
          <div class="name">张三哥</div>
          <p>又学到啦，继续加油哦！</p>
          <div class="footer">
            <div class="time">2019-02-10 10:15:30</div>
            <div class="button"><i class="icon-pinglun1"></i>回复（2）</div>
          </div>
          <div class="reply">
            <div class="title">
              <div class="img">
                <img src="/img/logo.png" alt="">
              </div>
              <span>李四弟</span>回复<span>张三哥</span>
            </div>
            <div class="info">共同学习，一起进步！</div>
            <div class="footer">
              <div class="time">2019-02-10 10:15:30</div>
              <div class="button"><i class="icon-pinglun1"></i>回复（0）</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  data () {
    return {
      formData: {
        list: [
          { id: 1, name: '项目管理' },
          { id: 2, name: '营商环境' },
        ],
      },
    }
  },
  methods: {
    back () {
      this.$emit('backPage', true)
    },
    submit () {},
  },
}
</script>

<style lang="scss" scoped>
.detail-page {
  padding: 20px;
  background-color: #fff;
  .head {
    display: flex;
    margin-bottom: 30px;
    .left {
      flex: 1;
      .title {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .tag {
        .el-tag {
          margin-right: 10px;
        }
      }
    }
    .right {
      width: 50px;
    }
  }
  .detail {
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
    .content {
      margin-bottom: 30px;
      .title {
        font-size: 18px;
        color: #000;
      }
      pre {
        line-height: 25px;
        color: #666;
      }
    }
  }
  .comment {
    .form {
      .button {
        text-align: right;
        margin-top: 15px;
      }
    }
    .list {
      display: flex;
      .img {
        width: 50px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .info {
        width: 100%;
        .name {
          color: #5473b6;
          margin-bottom: 10px;
        }
        p {
          margin: 0 0 10px 0;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          .time {
            color: #999;
          }
        }
        .button {
          height: 20px;
          line-height: 20px;
          cursor: pointer;
          i {
            font-size: 16px !important;
            margin-right: 5px;
            color: #999;
          }
        }
        .button-chosen {
          color: #f00;
        }
      }
      .reply {
        padding: 15px;
        background-color: #f3f3f3;
        .title {
          height: 50px;
          line-height: 30px;
          display: flex;
          .img {
            width: 40px;
            img {
              width: 30px;
              height: 30px;
            }
          }
          span {
            margin: 0 5px;
            color: #5473b6;
          }
        }
        .info {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
