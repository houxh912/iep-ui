<template>
  <div class="about-task">
    <div class="task-nav">
      <div class="left">
        <span class="navTitle">我的关系</span>
        <nav-tab :nav-list="relationship" @tab="tab"></nav-tab>
      </div>
      <el-button size="mini" plain @click="handManage">管理</el-button>
    </div>
    <relationship-content :contentData="contentData" :mark="mark"></relationship-content>
  </div>
</template>

<script>
import { getRelationshipList, getCustomList } from '@/api/wel/relationship_manage'
import NavTab from './NavTab'
import RelationshipContent from './RelationshipContent'
export default {
  components: { NavTab, RelationshipContent },
  data () {
    return {
      showClass: 0,
      navName: 'order',
      contentData: [
      ],
      relationship: [],
      content: [],
      mark:0,
    }
  },
  created () {
    this.loadTypeList()
  },
  methods: {
    tab (val) {
      if(val>0){
        this.contentData = this.content[val-1].userList
      }
      else{
        this.contentData = []
      }
      this.mark=val
    },
    handManage () {
      this.$router.push({
        path: '/wel/relationship_manage',
      })
    },
    loadTypeList () {
      getRelationshipList().then(({ data }) => {
        this.relationship = data.data
      })
      getCustomList().then(({ data }) => {
        this.content = data.data
      })
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
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .navTitle {
        font-size: 16px;
        padding-right: 20px;
        color: #000;
      }
    }
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
