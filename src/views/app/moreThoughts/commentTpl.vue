<template>
  <div class="comment">
    <div class="comment-item">
      <div class="comment-head">
        <div class="comment-avatar"><img :src="item.avatar" alt=""></div>
        <div class="comment-name">{{item.realName}}</div>
        <div class="huuifu">{{type == 'comment' ? '评论' : '回复'}}</div>
        <div class="comment-name">{{userInfo.name}}</div>
      </div>
      <div class="comment-content">{{item.replyMsg}}</div>
      <div class="comment-date">
        <div class="date">
          {{item.createTime}}
        </div>
        <!-- 评论的按钮行 -->
        <div class="button-list" v-if="item.thoughtsReplyList">
          <div class="button" @click="hadnleAddUp(item)"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
          <div class="button" @click="hadnleComComment(item)"><i class="icon-xiaoxi"></i> 回复（{{item.thoughtsReplyList.length}}）</div>
          <div class="button" @click="handleReward(item)"><i class="icon-yuanbao"></i> 打赏</div>
        </div>
      </div>
      <div class="comment-comment" v-if="commontActiveIndex == 1">
        <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
        <iep-button class="comment-submit" @click="() => {commontActiveIndex = -1}">取消</iep-button>
        <iep-button type="primary" class="comment-submit" @click="comCommentSubmit">发送</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CommentReply, addcCommentThumbsByRecord } from '@/api/cpms/thoughts'
import { mapActions } from 'vuex'

const initFormData = () => {
  return {
    replyMsg: '',
    thoughtsId: 0,
    commentId: '',
  }
}

export default {
  props: {
    item: {
      type: Object,
    },
    userInfo: {
      type: Object,
    },
    type: {
      type: String,
      default: 'comment',
    },
  },
  data () {
    return {
      commontActiveIndex: -1,
      form: initFormData(),
    }
  },
  methods: {
    // 回复评论
    hadnleComComment (row) {
      this.commontActiveIndex = 1
      this.form = {
        replyMsg: '',
        thoughtsId: row.thoughtsId,
        commentId: row.commentId,
      }
    },
    // 回复评论提交
    comCommentSubmit () {
      if (this.form.replyMsg == '') return
      CommentReply(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('回复成功！')
          this.commontActiveIndex = -1
          this.form = initFormData()
          this.$emit('load-page', true)
        } else {
          this.$message.error('评论出现了点问题，请重试！')
        }
      })
    },
    // 点赞
    hadnleAddUp () {
      addcCommentThumbsByRecord(this.item.commentId).then(({ data }) => {
        if (data.data) {
          this.$emit('load-page', true)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 打赏
    ...mapActions(['famsReward']),
    handleReward (row) {
      this.famsReward({ id: row.commentUserId, name: row.realName })
    },
  },
}
</script>

<style lang="scss" scoped>
.comment {
  .comment-item {
    border-bottom: 1px solid #ddd;
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    .comment-head {
      display: flex;
      align-items: center;
      .comment-avatar {
        margin-right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #eee;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .huuifu {
      }
      .comment-name {
        margin: 3px 5px;
        color: #4c6f8d;
      }
    }
    .comment-content {
      margin: 10px 0;
      text-align: left;
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
        justify-content: flex-end;
        .button {
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            color: #cb3737;
            border-color: #cb3737;
          }
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
</style>
