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
          <!-- <pre>{{formData.meetingContent}}</pre> -->
          <iep-html v-model="formData.meetingContent"></iep-html>
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
          <el-input type="textarea" rows=5 v-model="commentForm.commentContent"></el-input>
          <div class="button">
            <iep-button type="primary" @click="submit">发送</iep-button>
          </div>
        </div>
        <div class="list" v-for="(item, index) in commentList" :key="index">
          <div class="img">
            <img :src="`//cloud.govmade.com/${item.avatar}`" alt="">
          </div>
          <div class="info">
            <div class="name">{{item.realName}}</div>
            <p>{{item.commentContent}}</p>
            <div class="footer">
              <div class="time">{{item.createTime}}</div>
              <!-- <div class="button"><i class="icon-pinglun1"></i>回复（2）</div> -->
            </div>
          </div>
        </div>
        <div class="footer-button">
          <iep-button type="primary" @click="Instructions">领导批示</iep-button>
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
import { commentMaterial, getCommentPage } from '@/api/mlms/index'
function commentForm () {
  return {
    objectType: 2,
    commentObjectId: 0,
    commentContent: '',
    score: 0,
  }
}

export default {
  components: { InstrDialog },
  data () {
    return {
      formData: {
        meetingContent: '',
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
      commentForm: commentForm(),
      commentList: [],
    }
  },
  methods: {
    submit () {
      if (this.commentForm.commentContent == '') {
        this.$message.error('请填写评论的内容！')
        return
      }
      this.commentForm.commentObjectId = this.formData.id
      commentMaterial(this.commentForm).then(() => {
        this.getComment(this.formData.id)
        this.commentForm = commentForm()
      })
    },
    // 获取评论列表
    getComment (id) {
      getCommentPage({
        id: id,
        objectType: 2,
      }).then(({data}) => {
        this.commentList = data.data.records
      })
    },
    // 领导批示
    Instructions () {
      this.$refs['instrDialog'].open(this.formData)
    },
  },
  created () {
    getDataById(this.$route.params.id).then(({data}) => {
      this.formData = data.data
      this.getComment(data.data.id)
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
