<template>
  <div class="comment">
    <div class="comment-item" :class="type == 'comment' ? '' : 'comment-reply'">
      <div class="comment-head">
        <div class="comment-avatar" @click="handleDetail(item)"><iep-img :src="item.avatar" alt="" class="img" /></div>
        <div class="comment-name" @click="handleDetail(item)">{{item.realName}}</div>
        <div class="huuifu" v-if="type == 'reply'">{{type == 'comment' ? '评论' : '回复'}}</div>
        <div class="comment-name" v-if="type == 'reply'" @click="handleDetail(item, 'reply')">{{type === 'comment' ? userData.name : item.replyTo}}</div>
      </div>
      <!-- 评论显示区域 -->
      <div class="comment-content">
        <span v-for="(t, i) in transfPerson(item.replyMsg)" :key="i">
          <span class="person" v-if="t.type" @click="handlePerson(t, item.mentionedUsers)">{{t.html}}</span>
          <span v-else>{{t.html}}</span>
        </span>
      </div>
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
      <!-- 评论表单 -->
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
import { transfPerson, getName } from './util'

const initFormData = () => {
  return {
    replyMsg: '',
    thoughtsId: 0,
    commentId: '',
    nameList: [],
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
      transfPerson,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    // 回复评论
    hadnleComComment (row, isReply) {
      this.commontActiveIndex = 1
      this.form = {
        replyMsg: '',
        commentId: row.commentId,
        nameList: [],
      }
      if (isReply) {
        this.form = Object.assign(this.form, {
          reReplyId: row.replyId,
          replyUserId: row.userId,
        })
      } else {
        this.form.thoughtsId = row.thoughtsId
      }
    },
    // 回复评论提交
    comCommentSubmit () {
      if (this.form.replyMsg == '') return
      // 判断说说中是否存在人名
      let nameObj = getName(this.form.replyMsg)
      if (nameObj.type) {
        this.form.nameList = nameObj.list.map(m => m.name)
      }
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
    // @人详情
    handlePerson (row, list) {
      // 首先匹配返回的数据中是否存在此人名，即此人名是否为真实人名
      for (let item of list) {
        if (`@${item.name} ` === row.html) {
          this.$router.push(`/app/personal_style/${item.id}`)
          return
        }
      }
      this.$message.error('抱歉，没有找到此用户')
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
      span {
        white-space: pre-wrap;
      }
      .person {
        color: #cb3737;
        cursor: pointer;
      }
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
