<template>
  <div class="library">
    <div class="items" v-for="(item, index) in dataList" :key="index">
      <div class="avatar">
        <iep-img :src="item.avatar" @click.native="handleDetail(item.userId)" alt="" class="img"></iep-img>
      </div>
      <div class="content-list">
        <div class="top">
          <div class="title">
            <div class="name" @click="handleDetail(item.userId)">{{item.userName}}</div>
            <div class="date">F{{item.thoughtsId}}</div>
            <!-- <div class="date">{{getNumber(index)}}</div>原来的假楼层 -->
            <div class="date"><i class="icon-shijian"></i> {{item.createTime}}</div>
          </div>
          <div class="right" v-if="userInfo.userId !== item.userId">
            <iep-button class="add" v-if="item.isFollow === 0" @click="handleFollow(item)"><i class="icon-xinzeng"></i> 关注</iep-button>
            <iep-button class="add" v-else @click="handleUnFollow(item)"><i class="icon-check"></i> 已关注</iep-button>
          </div>
        </div>
        <!-- 说说的内容 -->
        <contentTpl :data="item">
          <!-- 转发原内容 -->
          <div class="forward-content" v-if="item.transmitId > 0">
            <forwardContent :contentData="item.transmittedThoughts" @click.native="handleForwardDetail(item.transmittedThoughts.thoughtsId)"></forwardContent>
          </div>
        </contentTpl>
        <!-- 按钮组 -->
        <div class="footer">
          <el-popover
            placement="right-start"
            title=""
            width="200"
            trigger="hover"
            :content="reference">
            <div slot="reference" class="button" @click="hadnleAddUp(item)" @mouseenter="mouseenterUp(item)" @mouseleave="mouseleaveUp" :class="item.praiseStatus > 0 ? 'red' : ''"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
          </el-popover>
          <div class="button" @click="hadnleComment(item, index)"><i class="icon-xiaoxi"></i> 评论（{{item.thoughtsCommentList.length}}）</div>
          <div class="button" @click="handleReward(item)"><i class="icon-yuanbao"></i> 打赏</div>
          <div class="button" @click="handleForward(item)" v-if="item.transmitId === 0"><i class="icon-zhuanfa1"></i> 转发</div>
          <div class="button" @click="handleCollect(item)" v-if="item.isCollected === 0"><i class="icon-heart"></i> 收藏</div>
          <div class="button" @click="handleNoCollect(item)" v-else><i class="icon-aixin"></i> 已收藏</div>
        </div>
        <!-- 说说评论 -->
        <div class="comment" v-if="activeIndex == index">
          <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
          <iep-button class="comment-submit" @click="() => {activeIndex = -1}">取消</iep-button>
          <iep-button type="primary" class="comment-submit" @click="commentSubmit">提交</iep-button>
        </div>
        <!-- 评论列表 -->
        <div class="comment-list" v-if="item.thoughtsCommentList.length > 0">
          <div v-for="(t, i) in item.thoughtsCommentList" :key="i">
            <commentTpl :item="t" :userData="{id: item.userId, name: item.userName}" @load-page="loadPage"></commentTpl>
            <commentTpl v-for="(comItem, comIndex) in t.thoughtsReplyList" :key="`${i}-${comIndex}`" :item="comItem" :userData="{id: t.commentUserId, name: t.realName}" @load-page="loadPage" type="reply"></commentTpl>
          </div>
        </div>
      </div>
    </div>
    <!-- 转发 -->
    <forwardDialog ref="forward" @load-page="loadPage"></forwardDialog>
    <!-- 收藏 -->
    <collect-dialog ref="collect" @load-page="loadPage"></collect-dialog>
  </div>
</template>

<script>
import { addThumbsUpByRecord, getThumbMembers, CommentThoughts } from '@/api/cpms/thoughts'
import { mapActions, mapGetters } from 'vuex'
import forwardContent from './forwardContent'
import commentTpl from './commentTpl'
import contentTpl from './content'
import forwardDialog from '../forwardDialog'
import CollectDialog from '@/views/mlms/material/components/collectDialog'
import { followById, unfollowById } from '@/api/cpms/iepuserfollow'

const initFormData = () => {
  return {
    replyMsg: '',
    thoughtsId: 0,
  }
}

export default {
  components: { forwardContent, commentTpl, contentTpl, forwardDialog, CollectDialog },
  props: {
    dataList: {
      type: Array,
    },
    params: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  data () {
    return {
      activeIndex: -1,
      form: initFormData(),
      reference: '加载中...',
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page', true)
    },
    handleDetail (id) {
      this.$router.push({
        path:`/app/personal_style/${id}`,
      })
    },
    // 获取编号
    getNumber (index) {
      let number = this.total
      number = number - ((this.params.current - 1) * this.params.size) - index
      let length = (this.total + '').length - (number + '').length + 1
      for (let i = 0; i < length; ++i) {
        number = '0' + number
      }
      return number
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
    // 点赞详情信息
    mouseenterUp (row) {
      if (row.thumbsUpCount > 0) {
        getThumbMembers(row.thoughtsId).then(({ data }) => {
          this.reference = data.data.map(m => m.name).join('、')
        })
      } else {
        this.reference = '暂无人点赞'
      }
    },
    // 说说详情
    handleForwardDetail (id) {
      this.$router.push(`/app/thought_detail/${id}`)
    },
    mouseleaveUp () {
      setTimeout(() => {
        this.reference = '加载中...'
      }, 300)
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
        this.activeIndex = -1
        this.loadPage()
      })
    },
    // 打赏
    ...mapActions(['famsReward']),
    handleReward (row) {
      this.famsReward({ id: row.userId, name: row.userName })
    },
    // 转发
    handleForward (row) {
      this.$refs['forward'].open(row)
    },
    // 收藏
    handleCollect (item) {
      this.$refs['collect'].openDialog([{
        name: item.content.slice(0, 10) + '...',
        type: 'thoughts',
        id: item.thoughtsId,
      }])
    },
    // 取消收藏
    handleNoCollect () {},
    // 关注
    handleFollow (row) {
      followById(row.userId).then(() => {
        this.loadPage()
      })
    },
    // 取消关注
    handleUnFollow (row) {
      unfollowById(row.userId).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.library {
  margin-top: 20px;
  .items {
    margin-bottom: 40px;
    display: flex;
    .name{
      cursor: pointer;
    }
    .avatar {
      margin-right: 35px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      .img{
        cursor: pointer;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .content-list {
      flex: 1;
      margin-top: 5px;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
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
        .comment {
          margin: 0 10px;
          border-bottom: 1px solid #eee;
        }
      }
      .title {
        display: flex;
        .name {
          font-size: 16px;
          color: #4d6e8f;
        }
        .date {
          padding: 2px 0 0 15px;
          color: #666;
          i {
            font-size: 14px !important;
          }
          &:nth-child(2) {
            color: #999;
          }
        }
      }
      .right {
        .add {
          i {
            font-size: 16px !important;
          }
        }
      }
      .item {
        margin-top: 7px;
      }
      .footer {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        .button {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 20px;
          height: 20px;
          cursor: pointer;
          i {
            margin-right: 5px;
          }
          &:hover {
            color: #cb3737;
            border-color: #cb3737;
          }
        }
      }
    }
  }
}
.red {
  color: #cb3737;
}
</style>

<style scoped>
.library >>> .forward-content {
  background-color: #fafafa;
  padding: 20px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
