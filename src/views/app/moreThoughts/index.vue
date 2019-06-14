<template>
  <div class="app-more-thoughts">
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="material">
      <div class="library">
        <div class="items" v-for="(item, index) in dataList" :key="index">
          <div class="avatar">
            <iep-img :src="item.avatar" alt="" class="img"></iep-img>
          </div>
          <div class="content">
            <div class="title">
              <div class="name">{{item.userName}}</div>
              <div class="date"><i class="icon-shijian"></i> {{item.createTime}}</div>
            </div>
            <div class="item">{{item.content}}</div>
            <!-- 说说评论 -->
            <div class="comment" v-if="activeIndex == index">
              <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
              <iep-button class="comment-submit" @click="() => {activeIndex = -1}">取消</iep-button>
              <iep-button type="primary" class="comment-submit" @click="commentSubmit">提交</iep-button>
            </div>
            <!-- 评论列表 -->
            <div class="comment-list" v-if="item.thoughtsCommentList.length > 0">
              <div class="comment-item" v-for="(comItem, comIndex) in item.thoughtsCommentList" :key="comIndex">
                <div class="comment-head">
                  <div class="comment-avatar"><img :src="comItem.avatar" alt=""></div>
                  <div class="comment-name">{{comItem.realName}}</div>
                  <div class="huuifu">评论</div>
                  <div class="comment-name">{{item.userName}}</div>
                </div>
                <div class="comment-content">{{comItem.replyMsg}}</div>
                <div class="comment-date">
                  <div class="date">
                    {{comItem.createTime}}
                  </div>
                  <div class="button-list" v-if="false">
                    <div class="button"><i class="icon-like"></i> 点赞（{{comItem.thumbsUpCount}}）</div>
                    <div class="button" @click="hadnleComComment(comItem, index, comIndex)"><i class="icon-pinglun1"></i> 评论（0）</div>
                    <div class="button"><i class="icon-yuanbao"></i> 打赏</div>
                  </div>
                </div>
                <div class="comment-comment" v-if="commontActiveIndex == `${index}-${comIndex}`">
                  <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
                  <iep-button class="comment-submit" @click="() => {commontActiveIndex = -1}">取消</iep-button>
                  <iep-button type="primary" class="comment-submit" @click="comCommentSubmit">提交</iep-button>
                </div>
              </div>
            </div>
            <!-- 按钮组 -->
            <div class="footer">
              <div class="button" @click="hadnleAddUp(item)"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
              <div class="button" @click="hadnleComment(item, index)"><i class="icon-pinglun1"></i> 评论（{{item.thoughtsCommentList.length}}）</div>
              <div class="button"><i class="icon-yuanbao"></i> 打赏</div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { geTallPage, CommentThoughts, addThumbsUpByRecord } from '@/api/cpms/thoughts'

const initParams = () => {
  return {
    current: 1,
    size: 10,
  }
}

const initFormData = () => {
  return {
    replyMsg: '',
    thoughtsId: 0,
  }
}

export default {
  components: {},
  data () {
    return {
      routerMatch: [
        {
          path: '/app/index',
          name: '首页',
        },
        {
          path: '/app/person',
          name: '国脉人',
        },
        {
          path: '/app/more_thoughts',
          name: '说说列表',
        },
      ],
      dataList: [
        {},
      ],
      total: 0,
      params: initParams(),
      activeIndex: -1,
      commontActiveIndex: -1,
      form: initFormData(),
      comForm: initFormData(),
    }
  },
  methods: {
    loadPage () {
      geTallPage(this.params).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
        this.activeIndex = -1
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    hadnleComment (item, index) {
      this.activeIndex = index
      this.form = {
        replyMsg: '',
        thoughtsId: item.thoughtsId,
      }
    },
    // 评论
    commentSubmit () {
      if (this.form.replyMsg == '') return
      CommentThoughts(this.form).then(() => {
        this.loadPage()
      })
    },
    // 点赞
    hadnleAddUp (row) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data }) => {
        if (data.data) {
          this.loadPage()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 回复评论
    hadnleComComment (row, index, comIndex) {
      this.commontActiveIndex = `${index}-${comIndex}`
      this.comForm = {
        replyMsg: '',
        thoughtsId: row.thoughtsId,
      }
    },
    // 回复评论提交
    comCommentSubmit () {
      if (this.comForm.replyMsg == '') return
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 20px;
  }
}
.material {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  .library {
    margin-top: 20px;
    .items {
      margin-bottom: 40px;
      display: flex;
      .avatar {
        width: 115px;
      }
      .content {
        flex: 1;
        margin-top: 5px;
        .comment {
          margin-top: 20px;
          text-align: right;
          .comment-submit {
            margin-top: 10px;
            margin-left: 10px;
          }
        }
        .comment-list {
          padding: 15px;
          background-color: #fafafa;
          margin-top: 15px;
          border-radius: 3px;
          .comment-item {
            border-bottom: 1px solid #ddd;
            margin-top: 10px;
            padding-bottom: 3px;
            .comment-head {
              display: flex;
              .comment-avatar {
                margin-right: 20px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                }
              }
              .huuifu {
                margin-top: 3px;
              }
              .comment-name {
                margin: 3px 15px;
                color: #5883ce;
              }
            }
            .comment-content {
              margin: 10px 0;
            }
            .comment-date {
              margin-bottom: 10px;
              color: #999;
              display: flex;
              .date {
                width: 160px;
              }
              .button-list {
                flex: 1;
                display: flex;
                text-align: right;
                justify-content: flex-end;
                .button {
                  margin-right: 20px;
                  cursor: pointer;
                }
              }
            }
            .comment-comment {
              margin-top: 20px;
              text-align: right;
              .comment-submit {
                margin-top: 10px;
                margin-left: 10px;
              }
            }
          }
          .comment-item:last-of-type {
            border: 0;
            .comment-date {
              margin-bottom: 0;
            }
          }
        }
        .title {
          display: flex;
          .name {
            font-size: 16px;
            color: #5883ce;
          }
          .date {
            padding: 2px 0 0 40px;
            color: #666;
            i {
              font-size: 14px !important;
            }
          }
        }
        .item {
          margin-top: 7px;
        }
        .footer {
          margin-top: 20px;
          display: flex;
          font-size: 14px;
          .button {
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.app-more-thoughts {
  .library {
    .items {
      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>

