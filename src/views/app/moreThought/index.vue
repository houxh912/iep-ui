<template>
  <iep-app-layout>
    <headTpl></headTpl>
    <div class="content">
      <div class="explain">共{{total}}条说说，<span class="publish" @click="handlePublish">我要发表</span></div>
      <div class="list">
        <IepNoData v-if="dataList.length == 0"></IepNoData>
        <div v-else>
          <div class="material">
            <div class="library">
              <div class="items" v-for="(item, index) in dataList" :key="index">
                <div class="avatar">
                  <iep-img :src="item.avatar" @click.native="handleDetail(item.userId)" alt="" class="img"></iep-img>
                </div>
                <div class="content">
                  <div class="top">
                    <div class="title">
                      <div class="name" @click="handleDetail(item.userId)">{{item.userName}}</div>
                      <div class="date">{{getNumber(index)}}</div>
                      <div class="date"><i class="icon-shijian"></i> {{item.createTime}}</div>
                    </div>
                    <!-- <el-button size="mini" round>只看此人</el-button> -->
                  </div>
                  <!-- 说说的内容 -->
                  <!-- <div class="item">{{item.content}}</div> -->
                  <div class="item" v-html="transfHtml(item.content)"></div>
                  <!-- 说说评论 -->
                  <div class="comment" v-if="activeIndex == index">
                    <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
                    <iep-button class="comment-submit" @click="() => {activeIndex = -1}">取消</iep-button>
                    <iep-button type="primary" class="comment-submit" @click="commentSubmit">提交</iep-button>
                  </div>
                  <!-- 评论列表 -->
                  <div class="comment-list" v-if="item.thoughtsCommentList.length > 0">
                    <div v-for="(t, i) in item.thoughtsCommentList" :key="i">
                      <commentTpl :item="t" :userInfo="{id: item.userId, name: item.userName}" @load-page="loadPage"></commentTpl>
                      <commentTpl v-for="(comItem, comIndex) in t.thoughtsReplyList" :key="`${i}-${comIndex}`" :item="comItem" :userInfo="{id: t.commentUserId, name: t.realName}" @load-page="loadPage" :type="'reply'"></commentTpl>
                    </div>
                  </div>
                  <!-- 按钮组 -->
                  <div class="footer">
                    <div class="button" @click="hadnleAddUp(item)"><i class="icon-like"></i> 点赞（{{item.thumbsUpCount}}）</div>
                    <div class="button" @click="hadnleComment(item, index)"><i class="icon-xiaoxi"></i> 评论（{{item.thoughtsCommentList.length}}）</div>
                    <div class="button" @click="handleReward(item)"><i class="icon-yuanbao"></i> 打赏</div>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div style="text-align: center;margin: 20px 0;">
                <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 发表说说 -->
    <publish-dialog ref="publish" @load-page="searchPage"></publish-dialog>
  </iep-app-layout>
</template>

<script>
import headTpl from './head'
import { geTallPage, CommentThoughts, addThumbsUpByRecord } from '@/api/cpms/thoughts'
import commentTpl from './commentTpl'
import { mapActions } from 'vuex'
import PublishDialog from '@/views/app/components/ThoughtsDialog/Publish'

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
  components: { headTpl, commentTpl, PublishDialog },
  data () {
    return {
      isShow: true,
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
        { thoughtsCommentList: [] },
      ],
      total: 0,
      params: initParams(),
      activeIndex: -1,
      commontActiveIndex: -1,
      form: initFormData(),
      paramData: {},
    }
  },
  methods: {
    searchPage (params) {
      if (params) {
        this.paramData = Object({}, this.paramData, params)
      }
      this.loadPage()
    },
    loadPage () {
      geTallPage(this.params).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
        this.activeIndex = -1
      })
    },
    handleDetail (id) {
      this.$router.push({
        path:`/app/personal_style/${id}`,
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
      this.famsReward({ id: row.userId, name: row.userName })
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
    handlePublish () {
      this.$refs['publish'].open()
    },
    // 将说说的内容转换成为新的内容
    transfHtml (val) {
      if (!val) return val
      let first = val.indexOf('#')
      let second = val.indexOf('# ') + 1
      if (second - first > 17) {
        return val
      } else {
        return val.slice(0, first) + '<span class="subject">' + val.slice(first, second) + '</span>' + val.slice(second)
      }
    },
  },
  created () {
    if (this.$route.query.id) {
      this.params.userId = this.$route.query.id
    }
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  margin: auto;
  padding: 14px;
  border-bottom: 1px solid #ddd;
  .publish {
    color: #cb3737;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
  }
  .material {
    width: 1200px;
    margin: 0 auto;
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
        .content {
          flex: 1;
          margin-top: 5px;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
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
              color: #4d6e90;
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
  }
}
</style>

<style scoped>
.content >>> .subject {
  color: #cb3737;
  cursor: pointer;
}
.content >>> .person {
  color: #4d6e90;
  cursor: pointer;
}
</style>
