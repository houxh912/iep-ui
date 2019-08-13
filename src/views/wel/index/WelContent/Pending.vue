<template>
  <div class="about-task">
    <div class="task-nav">
      <nav-tab :nav-list="dataList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData" @on-detail="handleDetail"></nav-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavTab from './NavTab'
import NavContent from './NavContent'
import { getPending } from '@/api/wel/index'
const detailUrlMap = {
  announcement: '/ims_spa/announcement_detail',
  approval: '/hrms_spa/approval_detail',
  instruction: '/mlms_spa/email/detail',
}
export default {
  components: { NavTab, NavContent },
  data () {
    return {
      showClass: 0,
      navName: 'announcement',
      contentData: [],
      dataList: [
        {
          subtitle: '通知公告',
          type: 'announcement',
          id: 0,
        },
        {
          subtitle: '领导批示',
          type: 'instruction',
          id: 1,
        },
        {
          subtitle: '待审批',
          type: 'approval',
          id: 2,
        },
      ],
      content: [],
      hrms_to_approval: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.tab(this.navName)
    this.hrms_to_approval = this.permissions['hrms_to_approval']
    if (this.hrms_to_approval) {
      this.dataList = [this.dataList[0], this.dataList[1]]
    }
  },
  methods: {
    handleDetail (row) {
      const path = detailUrlMap[row.type] || false
      if (!path) {
        return
      }
      this.$router.push({
        path: `${detailUrlMap[row.type]}/${row.id}`,
      })
    },
    tab (val) {
      getPending(val).then(({ data }) => {
        this.contentData = data ? data.data.map(m => {
          return {
            ...m,
            type: val,
          }
        }) : []
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
    align-items: center;
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: $--menu-color-primary;
    }
  }
}
</style>
<style scoped>
.about-task >>> .iep-ellipsis {
  color: #7f7f7f;
}
</style>
