<template>
  <div class="about-task">
    <div class="task-nav">
      <span class="navTitle">{{navList.title}}</span>
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData"></nav-content>
  </div>
</template>

<script>
import NavTab from './NavTab'
import NavContent from './NavContent'
import { getApprovalList } from '@/api/wel/administrative_approval'
export default {
  components: { NavTab, NavContent },
  data () {
    return {
      showClass: 0,
      navName: 'order',
      contentData: [],
      navList: {
        title: '我的待办',
        dataList: [
          {
            subtitle: '领导指示',
            type: 'order',
            id: 0,
          },
          {
            subtitle: '未读通知',
            type: 'message',
            id: 1,
          },
          {
            subtitle: '我的任务',
            type: 'task',
            id: 2,
          },
          {
            subtitle: '待审核',
            type: 'audit',
            id: 3,
          },
        ],
      },
      content: {
        order: [{ title: '关于加快熟悉全国数字政府建设工作情况的简报学习', author: '郑爱军', date: '12-04' }, { title: '关于加快学习数字政府白皮书、专家讲话等材料的建议', author: '郑爱军', date: '12-01' }, { title: '推荐一份“数字政府主题报告vip”供做研究的同学学习', author: '郑爱军', date: '10-28' }, { title: '对《20180820国脉视效中心早会》的领导批示', author: '杨冰之', date: '08-21' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '黄磊', date: '05-30' }],
        message: [{ title: '关于对上海国脉知政、广州国脉班委会任命及成立网络数据运营中心的通知', author: '崔颖', date: '03-15' }, { title: '2019年3月14日18：30~19：30内网更新维护公告', author: '邵万炯', date: '03-14' }, { title: '关于发布2019年第一期国脉项目简报的通知', author: '崔颖', date: '03-12' }, { title: '关于内网材料库上传营商通操作视频的通知', author: '崔颖', date: '03-07' }, { title: '关于发布市场开发与产品销售情况调研的通知', author: '崔颖', date: '03-07' }],
        task: [{ title: '关于20190129微信优秀项需对接全流程管理项目分享》的通知', author: '崔颖', date: '01-30' }, { title: '关于规范国脉社群管理及相关培训的通知', author: '崔颖', date: '01-30' }, { title: '关于20190126微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知', author: '邵万炯', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '邵万炯', date: '01-30' }, { title: '关于加快熟悉全国数字政府建设工作情况的简报学习', author: '崔颖', date: '01-30' }],
        audit: [{ title: '关于20190129微接全流程管理项目分享》的通知', author: '崔颖', date: '01-30' }, { title: '关于规范国脉社群管理及相', author: '崔颖', date: '01-30' }, { title: '关于20190126微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知', author: '崔颖', date: '01-30' }, { title: '关于发布市场开发与产品销售情况调研的通知', author: '邵万炯', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理)的通知', author: '崔颖', date: '01-30' }],
      },

    }
  },
  created () {
    this.contentData = this.content.order
  },
  methods: {
    tab (val) {
      console.log(val)
      if (val === 'audit1') {
        getApprovalList().then(({ data }) => {
          console.log(data)
        })
      } else {
        this.contentData = this.content[val]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.about-task {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .task-nav {
    display: flex;
    align-items: center;
    .navTitle {
      font-size: 16px;
      padding-right: 20px;
    }
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
