<template>
  <div class="about-task">
    <div class="task-nav">
      <div class="left">
        <span class="navTitle">我的关系</span>
        <relationship-nav-tab :nav-list="relationship" @tab="tab"></relationship-nav-tab>
      </div>
    </div>
    <relationship-content :contentData="contentData" :mark="mark"></relationship-content>
  </div>
</template>

<script>
import { getRelationshipList, getCustomList } from '@/api/wel/relationship_manage'
import RelationshipNavTab from './RelationshipNavTab'
import RelationshipContent from './RelationshipContent'
export default {
  components: { RelationshipNavTab, RelationshipContent },
  data () {
    return {
      showClass: 0,
      navName: 'order',
      contentData: [
      ],
      relationship: [],
      content: [
        { userList: [] },
      ],
      mark: 0,
    }
  },
  created () {
    this.loadTypeList()
  },
  methods: {
    tab (val) {
      if (val > 0) {
        this.contentData = this.content[val - 1].userList
      }
      this.mark = val
    },
    loadTypeList () {
      getRelationshipList().then(({ data }) => {
        this.relationship = data.data.splice(0, 3)
        this.relationship[0].name = '好友'
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
  padding: 20px 30px 0;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .task-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
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
    margin-right: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: $--menu-color-primary;
    }
  }
}
</style>
