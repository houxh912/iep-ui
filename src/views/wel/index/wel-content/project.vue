<template>
  <div class="project">
    <div class="project-nav">
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData"></nav-content>
  </div>
</template>

<script>
import navTab from './navTab'
import navContent from './navContent'
export default {
  components: { navTab, navContent },
  data () {
    return {
      contentData: '',
      navList: {
        title: '我的代办',
        dataList: [{
          subtitle: '执行项目',
          type: 'action',
          id: 0,
        }, {
          subtitle: '完成项目',
          type: 'success',
          id: 1,
        }],
      },
      content: {
        action: [{ title: '关于20190129微信优秀项目分享《浙江省供需对接全流程管理项目分享》的通知', process: 20, date: '01-30' }, { title: '关于规范国脉社群管理及相关培训的通知', process: 40, date: '01-30' }, { title: '关于20190126微信优秀项目分享《2018版浙江目录梳理项目经验分享》的通知', process: 60, date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', process: 80, date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', process: 90, date: '01-30' }],
        success: [{ title: '关于20190129微信优秀项目分享', process: 100, date: '01-30' }, { title: '关于规范国脉社群管理及相关培训的通知', process: 100, date: '01-30' }, { title: '关于20190126微信优江目录梳理项目经验分享》的通知', process: 100, date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', process: 100, date: '01-30' }, { title: '关于发布《国脉集团项目质量管理办法》( 征求意见稿)的通知', process: 100, date: '01-30' }],
      },
    }
  },
  created () {
    this.contentData = this.content.action
  },
  methods: {
    tab (val) {
      this.contentData = this.content[val]
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  padding: 20px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .project-nav {
    display: flex;
    align-items: center;
  }
}
</style>
