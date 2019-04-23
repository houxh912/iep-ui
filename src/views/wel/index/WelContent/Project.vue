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
        action: [],
        success: [],
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
    .title {
      color: #000;
    }
  }
}
</style>
<style scoped>
.project-nav >>> .title {
  color: #000;
}
.project-nav >>> .tabList .color {
  color: #cb3737;
}
</style>

