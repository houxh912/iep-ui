<template>
  <div class="about-task">
    <div class="task-nav">
      <span class="navTitle">{{navList.title}}</span>
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData" @on-detail="handleDetail"></nav-content>
  </div>
</template>

<script>
import NavTab from './NavTab'
import NavContent from './NavContent'
import { getPending } from '@/api/wel/index'
const detailUrlMap = {
  approval: '/hrms_spa/approval_detail',
}
export default {
  components: { NavTab, NavContent },
  data () {
    return {
      showClass: 0,
      navName: 'instruction',
      contentData: [],
      navList: {
        title: '我的待办',
        dataList: [
          {
            subtitle: '领导指示',
            type: 'instruction',
            id: 0,
          },
          {
            subtitle: '待审批',
            type: 'approval',
            id: 3,
          },
        ],
      },
      content: [],
    }
  },
  created () {
    this.tab(this.navName)
  },
  methods: {
    handleDetail (row) {
      const path = detailUrlMap[row.type] || false
      if (!path) {
        return
      }
      this.$router.push({
        path: detailUrlMap[row.type],
        query: {
          id: row.id,
        },
      })
    },
    tab (val) {
      getPending(val).then(({ data }) => {
        this.contentData = data.data.map(m => {
          return {
            ...m,
            type: val,
          }
        })
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
