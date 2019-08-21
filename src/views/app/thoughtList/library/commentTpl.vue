<template>
  <div class="comment">
    <div class="comment-item" :class="type == 'comment' ? '' : 'comment-reply'">
      <div class="comment-head">
        <div class="comment-avatar" @click="handleDetail(item)"><iep-img :src="item.avatar" alt="" class="img" /></div>
        <div class="comment-name" @click="handleDetail(item)">{{item.realName}}</div>
        <div class="huuifu" v-if="type == 'reply'">{{type == 'comment' ? '评论' : '回复'}}</div>
        <div class="comment-name" v-if="type == 'reply'" @click="handleDetail(item, 'reply')">{{type === 'comment' ? userData.name : item.replyTo}}</div>
      </div>
      <div class="comment-content">{{item.replyMsg}}</div>
      <div class="comment-date">
        <div class="date">
          {{item.createTime}}
        </div>
        <!-- 评论的按钮行 -->
        <div class="button-list" v-if="item.thoughtsReplyList">
          <div class="button" @click="handleDelete(item)" v-if="userInfo.userId === item.commentUserId"><i class="icon-shanchu"></i> 删除</div>
          <div class="button" @click="hadnleAddUp(item)" :class="item.praiseStatus > 0 ? 'red' : ''"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
          <div class="button" @click="hadnleComComment(item)"><i class="icon-xiaoxi"></i> 回复（{{item.thoughtsReplyList.length}}）</div>
          <div class="button" @click="handleReward(item)"><i class="icon-yuanbao"></i> 打赏</div>
        </div>
        <div class="button-list" v-else>
          <div class="button" @click="handleDelete(item, 'reply')" v-if="userInfo.userId === item.userId"><i class="icon-shanchu"></i> 删除</div>
          <!-- <div class="button" @click="hadnleAddUp(item, 'reply')" :class="item.thumbsUpCount > 0 ? 'red' : ''"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div> -->
          <div class="button" @click="hadnleAddUp(item, 'reply')"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
          <div class="button" @click="hadnleComComment(item, 'reply')"><i class="icon-xiaoxi"></i> 回复</div>
          <div class="button" @click="handleReward(item, 'reply')"><i class="icon-yuanbao"></i> 打赏</div>
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
import { CommentReply, addcCommentThumbsByRecord, addReplyThumbsByRecord, getThumbMembers, deleteCommentThumbsById, deleteCommentById } from '@/api/cpms/thoughts'
import { mapActions, mapGetters } from 'vuex'

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
    userData: {
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
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    // 回复评论
    hadnleComComment (row, isReply) {
      console.log('row: ', row)
      this.commontActiveIndex = 1
      this.form = {
        replyMsg: '',
        commentId: row.commentId,
      }
      if (isReply) {
        this.form = Object.assign(this.form, {
          reReplyId: row.replyId,
          replyUserId: row.userId,
        })
      } else {
        this.form.thoughtsId = row.thoughtsId      }
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
    hadnleAddUp (row, isReply) {
      let fn = () => {}
      let id = -1
      if (isReply) {
        fn = addReplyThumbsByRecord
        id = row.replyId
      } else {
        fn = addcCommentThumbsByRecord
        id = row.commentId
      }
      fn(id).then(({ data }) => {
        if (data.data) {
          this.$emit('load-page', true)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 打赏
    ...mapActions(['famsReward']),
    handleReward (row, isReply) {
      if (isReply) {
        this.famsReward({ id: row.userId, name: row.realName })
      } else {
        this.famsReward({ id: row.commentUserId, name: row.realName })
      }
    },
    // 点赞列表
    getThumbMembers () {
      getThumbMembers().then(() => { })
    },
    // 评论删除
    handleDelete (row, isReply) {
      if (isReply) {
        deleteCommentById(row.replyId).then(() => {
          this.$emit('load-page', true)
        })
      } else {
        deleteCommentThumbsById(row.commentId).then(() => {
          this.$emit('load-page', true)
        })
      }
    },
    // 详情
    handleDetail (row, state) {
      console.log('row: ', row)
      if (state === 'reply') { // 被回复者
        this.$router.push(`/app/personal_style/${row.repliedUserId}`)
      } else if (row.commentUserId) { // 评论者
        this.$router.push(`/app/personal_style/${row.commentUserId}`)
      } else { // 回复者
        this.$router.push(`/app/personal_style/${row.userId}`)
      }
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
        .img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
        }
      }
      .comment-name {
        margin: 3px 5px;
        color: #4c6f8d;
        cursor: pointer;
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
  .comment-reply {
    margin-left: 40px;
  }
}
.red {
  color: #cb3737;
}
</style>
