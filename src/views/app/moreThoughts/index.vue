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
              <div class="date">{{getNumber(index)}}</div>
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
              <div v-for="(t, i) in item.thoughtsCommentList" :key="i" >
                <commentTpl :item="t" :userInfo="{id: item.userId, name: item.userName}" @load-page="loadPage"></commentTpl>
                <commentTpl v-for="(comItem, comIndex) in t.thoughtsReplyList" :key="`${i}-${comIndex}`" :item="comItem" :userInfo="{id: t.commentUserId, name: t.realName}" @load-page="loadPage" :type="'reply'"></commentTpl>
              </div>
            </div>
            <!-- 按钮组 -->
            <div class="footer">
              <div class="button" @click="hadnleAddUp(item)"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
              <div class="button" @click="hadnleComment(item, index)"><i class="icon-pinglun1"></i> 评论（{{item.thoughtsCommentList.length}}）</div>
              <div class="button" @click="handleReward(item)"><i class="icon-yuanbao"></i> 打赏</div>
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
import commentTpl from './commentTpl'
import { mapActions } from 'vuex'

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
  components: { commentTpl },
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
        {thoughtsCommentList: []},
      ],
      total: 0,
      params: initParams(),
      activeIndex: -1,
      commontActiveIndex: -1,
      form: initFormData(),
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
    // 打赏
    ...mapActions(['famsReward']),
    handleReward (row) {
      this.famsReward({id: row.userId, name: row.userName})
    },
    // 获取编号
    getNumber (index) {
      let number = this.total
      number = number - ((this.params.current - 1) * this.params.size) - index
      if (number < 10) {
        return '000' + number
      } else if (number < 100) {
        return '00' + number
      } else if (number < 1000) {
        return '0' + number
      } else {
        return number
      }
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

