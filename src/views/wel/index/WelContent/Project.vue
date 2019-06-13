<template>
  <div class="about-task">
    <div class="task-nav">
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
      navList: [{
        subtitle: '我的项目',
        type: 'action',
        id: 0,
      }],
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
.about-task {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .task-nav {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
