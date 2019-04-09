<template>
  <div class="project">
    <div class="project-nav">
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
      contentData: '',
      navList: {
        title: '我的待办',
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
        action: [{ name: '中国进口汽车贸易有限公司网站运维服务外包项目', process: 20, time: '2019-01-11' }, { name: '中国机械设备工程股份有限公司网站运维服务外包项目', process: 40, time: '2019-01-11' }, { name: '国机汽车股份有限公司网站运维服务外包项目', process: 35, time: '2019-01-08' }, { name: '20190218中国钢研科技集团有限公司网站群信息化项目', process: 12, time: '2019-02-28' }, { name: '20180604国脉电子政务网数据基因—优化营商环境 助建数字政府专题输出', process: 85, time: '2018-09-11' }],
        success: [{ name: '20180630国脉区块链页面设计美化', process: 100, time: '2018-08-02' }, { name: '20181127中国银保监会网站整合规划咨询项目', process: 100, time: '2019-02-20' }, { name: '2017年华润双鹤门户网站运维服务项目', process: 100, time: '2019-02-13' }, { name: '20180701中免公司官方网站建设项目', process: 100, time: '2018-12-17' }, { name: '20170331舟山市海洋与渔业局中船通公共服务平台', process: 100, time: '2018-08-02' }],
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
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .project-nav {
    display: flex;
    align-items: center;
  }
}
</style>
