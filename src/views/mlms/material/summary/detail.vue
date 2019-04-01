<template>
  <basic-container>
    <el-col class="left">
      <page-header :title="formData.title" :backOption="backOption">
        <div slot="sub" class="tags">
          <el-tag type="info" v-for="(item, index) in formData.tagKeyWords" :key="index">{{item}}</el-tag>
        </div>
      </page-header>

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
          <el-input type="textarea" rows=5 v-model="comment"></el-input>
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
        <div class="footer-button">
          <iep-button type="danger" @click="Instructions">领导批示</iep-button>
        </div>
      </div>
    </el-col>

    <el-col class="right">
      <div class="icon">
        <i class="icon-huiyikaihuitaolun"></i>
      </div>
      <h3 class="title">会议时间</h3>
      <p class="content" v-text="formData.meetingTime"></p>
      <h3 class="title">会议地点</h3>
      <p class="content" v-text="formData.meetingLocation"></p>
      <h3 class="title">主持人</h3>
      <p class="content" v-text="formData.hostName"></p>
      <h3 class="title">参会人</h3>
      <p class="content" v-text="formData.attendeeName"></p>
      <h3 class="title">抄送人</h3>
      <p class="content" v-text="formData.receiverName"></p>
    </el-col>
    <instr-dialog ref="instrDialog"></instr-dialog>
  </basic-container>
</template>
<script>
import { getDataById } from '@/api/mlms/material/summary'
import InstrDialog from './instrDialog'

export default {
  components: { InstrDialog },
  data () {
    return {
      formData: {
        list: [
          { id: 1, name: '项目管理' },
          { id: 2, name: '营商环境' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1)
        },
      },
      comment: '',
    }
  },
  methods: {
    submit () {},
    // 领导批示
    Instructions () {
      this.$refs['instrDialog'].open()
    },
  },
  created () {
    getDataById(this.$route.params.id).then(({data}) => {
      this.formData = data.data
      this.formData.hostName = this.formData.host.length > 0 ? this.formData.host[0].name : '无'
      // 获取人物
      let fn = (obj) => {
        let msg = ''
        for (let key in obj) {
          if (obj[key] !== null) {
            for (let item of obj[key]) {
              msg += item.name + '、'
            }
          }
        }
        if (msg === '') {
          return '无'
        } else {
          return msg.slice(0, msg.length-1)
        }
      }
      this.formData.attendeeName = fn(this.formData.attendee) // 参会人
      this.formData.receiverName = fn(this.formData.receiver) // 参会人
    })
  },
}
</script>

<style lang="scss" scoped>
.left {
  width: calc(100% - 370px);
  margin-right: 20px;
  .tags {
    .el-tag {
      margin-right: 10px;
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
        white-space:pre-wrap; /* css3.0 */ 
        white-space:-moz-pre-wrap; /* Firefox */ 
        white-space:-pre-wrap; /* Opera 4-6 */ 
        white-space:-o-pre-wrap; /* Opera 7 */ 
        word-wrap:break-word; /* Internet Explorer 5.5+ */ 
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
    .footer-button {
      margin-top: 20px;
      text-align: right;
    }
  }
}
.right {
  border: 1px solid #eee;
  width: 350px;
  padding: 20px 10px;
  text-align: center;
  .icon {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    text-align: center;
    margin-left: 115px;
    i {
      font-size: 66px !important;
      color: #bbb;
    }
  }
  .title {
    font-weight: 700;
    font-size: 16px;
    margin: 20px 0 10px;
  }
  .content {
    margin-bottom: 50px;
  }
}
</style>
