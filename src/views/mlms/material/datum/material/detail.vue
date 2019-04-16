<template>
  <basic-container>
    <el-col class="left">
      <page-header :title="formData.materialName" :backOption="backOption"></page-header>

      <el-row class="info">
        <div class="person">
          <div class="name">{{formData.creatorRealName}}</div>
          <div class="date">{{formData.createTime}}</div>
          <!-- <i class="icon-yanjing icon"></i>
          <div class="open"> 111</div>
          <i class="icon-download icon"></i>
          <div class="down"> 88</div> -->
        </div>
        <div class="operat">
          <!-- <div class="button"><i class="icon-shoucang"></i> 收藏</div>
          <div class="button"><i class="icon-youxiangshixin"></i> 分享</div> -->
        </div>
      </el-row>
      <el-row class="sub-title">
        <pre>{{formData.intro}}</pre>
      </el-row>
      <el-row class="content">
        <pre>{{formData.content}}</pre>
      </el-row>
      <el-row class="down-load">
        相关附件：
        <div class="file" v-for="(item, index) in formData.attachFileList" :key="index">
          <i class="icon-fujian"></i>{{item.name}}<span class="tip" @click="downLoad(item)">（消耗5国脉贝下载）</span>
        </div>
      </el-row>
      <el-row class="footer">
        <div class="footer-left">
          <el-tag v-for="(item, index) in formData.tagKeyWords" :key="index" type="info">{{item}}</el-tag>
        </div>
        <div class="footer-right">
          <div class="wrong" @click="handleWrong">
            <i class="icon-chakantiezigengduojubao"></i> 纠错
          </div>
        </div>
      </el-row>
      <el-row class="comment">
        <div class="form">
          <h2 class="title">评价评论 <div class="rate"><el-rate v-model="comment.score"></el-rate></div></h2>
          <el-input type="textarea" rows=5 v-model="comment.commentContent"></el-input>
          <div class="button">
            <iep-button type="primary" @click="submit">发送</iep-button>
          </div>
        </div>
        <div class="list" v-for="(item, index) in this.commentList" :key="index">
          <div class="img">
            <img :src="`//cloud.govmade.com/${item.avatar}`" alt="">
          </div>
          <div class="comment-info">
            <div class="name">{{item.realName}} <div class="rate"><el-rate v-model="item.score" disabled></el-rate></div></div>
            <p>{{item.commentContent}}</p>
            <div class="footer">
              <div class="time">{{item.createTime}}</div>
            </div>
          </div>
        </div>
      </el-row>

    </el-col>

    <el-col class="right">
      <div class="info">
        <div class="name">{{formData.creatorRealName}}</div>
        <div class="num">共{{materialTotal}}篇材料</div>
        <div class="foot">
          <iep-button type="danger">订阅</iep-button>
          <iep-button type="danger">向他拜师</iep-button>
        </div>
      </div>
      <div class="material">
        <h3>优秀材料</h3>
        <p v-for="(item, index) in greatMaterialList" :key="index" @click="handleDetail(item)">{{item.name}}</p>
      </div>
    </el-col>
    <wrongDialog ref="wrong"></wrongDialog>
  </basic-container>
</template>

<script>
import { getDataById, downloadCount, getGreatMaterial, getMaterialTotal } from '@/api/mlms/material/datum/material'
import { commentMaterial, getCommentPage } from '@/api/mlms/index'
import { downloadFile } from '@/api/common'
import wrongDialog from './wrongDialog'

function commentForm () {
  return {
    objectType: 1,
    commentObjectId: 0,
    commentContent: '',
    score: 0,
  }
}

export default {
  components: { wrongDialog },
  data () {
    return {
      formData: {

      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1)
        },
      },
      comment: commentForm(),
      commentList: [],
      materialTotal: 0,
      greatMaterialList: [],
    }
  },
  methods: {
    submit () {
      if (this.comment.commentContent == '') {
        this.$message.error('请先填写评论的内容！')
        return
      }
      this.comment.commentObjectId = this.formData.id
      commentMaterial(this.comment).then(() => {
        this.getComment(this.formData.id)
        this.comment = commentForm()
      })
    },
    // 领导批示
    Instructions () {
      this.$refs['instrDialog'].open()
    },
    // 获取评论列表
    getComment (id) {
      getCommentPage({
        id: id,
        objectType: 1,
      }).then(({data}) => {
        this.commentList = data.data.records
      })
    },
    // 附件下载
    downLoad (obj) {
      downloadFile(obj)
      // /getUpload/{id}
      downloadCount(this.formData.id)
    },
    // 纠错
    handleWrong () {
      this.$refs['wrong'].open(this.formData)
    },
    handleDetail (row) {
      this.$router.push(`/mlms_spa/material/detail/${row.id}`)
    },
    getDataById (id) {
      getDataById(id).then(({data}) => {
        if (data.data == null) {
          this.$message.error(data.msg)
          return
        }
        this.formData = data.data
        this.getComment(data.data.id)
        // 获取优秀材料
        getGreatMaterial(data.data.creator).then(({data}) => {
          this.greatMaterialList = data
        })
        getMaterialTotal(data.data.creator).then(({data}) => {
          this.materialTotal = data.data
        })
      })
    },
  },
  created () {
    this.getDataById(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.getDataById(to.params.id)
    next()
  },
}
</script>

<style lang="scss" scoped>
.left {
  width: calc(100% - 370px);
  margin-right: 20px;
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .person {
      flex: 1;
      display: flex;
      .date {
        color: #666;
      }
      .icon {
        line-height: 20px;
        margin-right: 5px;
      }
      div {
        margin-right: 20px;
      }
    }
    .operat {
      display: flex;
      line-height: 18px;
      .button {
        margin-right: 10px;
        color: #666;
        i {
          font-size: 16px !important;
        }
      }
    }
  }
  .sub-title {
    background-color: #f5f5f5;
    padding: 20px;
  }
  .content {
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .down-load {
    background-color: #f5f5f5;
    padding: 20px;
    margin-bottom: 20px;
    .file {
      cursor: pointer;
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: #999;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .footer-left {
      flex: 1;
      .el-tag {
        margin-right: 10px;
      }
    }
    .footer-right {
      .wrong {
        cursor: pointer;
        i {
          font-size: 16px !important;
        }
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
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
      padding: 10px 0;
      .img {
        width: 50px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .comment-info {
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
  padding: 20px;
  .info {
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    .name {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .num {
      color: #999;
      margin-bottom: 10px;
    }
    .el-button {
      margin-right: 15px;
    }
  }
  .material {
    padding: 20px 0;
    h3 {
      font-size: 18px;
    }
    p {
      cursor: pointer;
    }
  }
}
pre {
  white-space:pre-wrap; /* css3.0 */ 
  white-space:-moz-pre-wrap; /* Firefox */ 
  white-space:-pre-wrap; /* Opera 4-6 */ 
  white-space:-o-pre-wrap; /* Opera 7 */ 
  word-wrap:break-word; /* Internet Explorer 5.5+ */ 
}
.rate {
  width: 160px;
  display: inline-block;
  font-size: 28px;
}
</style>
