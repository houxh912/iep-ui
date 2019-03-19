<template>
  <div class="about-task">
    <div class="task-nav">
      <span class="navTitle">{{navList.title}}（ 8 ）</span>
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData"></nav-content>
  </div>
</template>

<script>
import NavTab from './NavTab'
import NavContent from './NavContent'
export default {
  components: { NavTab, NavContent },
  data () {
    return {
      showClass: 0,
      navName: 'order',
      contentData: [],
      navList: {
        title: '我的待办',
        dataList: [{
          subtitle: '领导指示',
          type: 'order',
          id: 0,
        }, {
          subtitle: '未读通知',
          type: 'message',
          id: 1,
        }, {
          subtitle: '我的任务',
          type: 'task',
          id: 2,
        }, {
          subtitle: '待审核',
          type: 'audit',
          id: 3,
        }],
      },
      content: {
        order: [{ title: '关于20190129微信优秀项目分享《浙江省供需对接全流程管理项目分享》的通知', author: '黄磊', date: '01-30' }, { title: '关于规范国脉社群管理及相关培训的通知', author: '黄磊', date: '01-30' }, { title: '关于20190126微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知', author: '黄磊', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '黄磊', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '黄磊', date: '01-30' }],
        message: [{ title: '关于20190129微信优秀项目分享', author: '王璐燕', date: '01-30' }, { title: '关于规范国脉社群管理及相关培训的通知', author: '王璐燕', date: '01-30' }, { title: '关于20190126微信优江目录梳理项目经验分享》的通知', author: '王璐燕', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '王璐燕', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '王璐燕', date: '01-30' }],
        task: [{ title: '关于20190129微信优秀项需对接全流程管理项目分享》的通知', author: '333', date: '01-30' }, { title: '关于规范国脉社群管理及相关培训的通知', author: '333', date: '01-30' }, { title: '关于20190126微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知', author: '333', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '333', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', author: '333', date: '01-30' }],
        audit: [{ title: '关于20190129微接全流程管理项目分享》的通知', author: '444', date: '01-30' }, { title: '关于规范国脉社群管理及相', author: '444', date: '01-30' }, { title: '关于20190126微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知', author: '4444', date: '01-30' }, { title: '关于发布《国管理办法》( 征求意见稿)的通知', author: '444', date: '01-30' }, { title: '关于发布《国脉集团项目质量管理)的通知', author: '444', date: '01-30' }],
      },

    }
  },
  created () {
    this.contentData = this.content.order
  },
  methods: {
    tab (val) {
      this.contentData = this.content[val]
    },
  },
}
</script>

<style lang="scss" scoped>
.about-task {
  padding: 20px 30px;
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
