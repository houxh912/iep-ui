<template>
  <div class="leader-top">
    <el-card class="leader-item" :class="{disabled: item.disabled}" v-for="item in itemList" :key="item.id" :shadow="item.disabled ? 'never' : 'hover'" @click.native="handleClick(item)">
      <span class="info">
        <span class="sub-title">{{item.title}}</span><span class="time" :style="item.bgc">{{item.time}}</span>
      </span>
      <span class="num">{{countObj[item.num]}}</span>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
import { getCount } from '@/api/mlms/leader_report/'
import mixins from '@/mixins/mixins'
export default {
  data () {
    return {
      name: 'leader-top',
      mixins: [mixins],
      itemList: [
        {
          routerPath: 'visiting_log',
          title: '拜访日志',
          time: '全年',
          num: 'visitNumber',
          bgc: {
            background: '#d7ba9a',
          },
          disabled: false,
        },
        {
          routerPath: 'staff_report',
          name: 'StaffWeek',
          title: '员工周报',
          time: '本周',
          num: 'personalWeeklyReport',
          bgc: {
            background: '#89c7d6',
          },
          disabled: false,
        },
        {
          routerPath: 'staff_report',
          name: 'StaffMonth',
          title: '员工月报',
          time: '本月',
          num: 'personalMonthlyReport',
          bgc: {
            background: '#dbadad',
          },
          disabled: false,
        },
        {
          routerPath: 'project_report',
          title: '项目周报',
          time: '本周',
          num: 'projectWeeklyReport',
          bgc: {
            background: '#d7ba9a',
          },
          disabled: false,
        },
        {
          routerPath: 'origanaze_report',
          name: 'OriganazeWeek',
          title: '组织周报',
          time: '本周',
          num: 'orgWeeklyReport',
          bgc: {
            background: '#89c7d6',
          },
          disabled: false,
        },
        {
          routerPath: 'origanaze_report',
          name: 'OriganazeMonth',
          title: '组织月报',
          time: '本月',
          num: 'orgMonthlyReport',
          bgc: {
            background: '#dbadad',
          },
          disabled: false,
        },
      ],
      countObj: {
        visitNumber: 0,
        personalWeeklyReport: 0,
        personalMonthlyReport: 0,
        projectWeeklyReport: 0,
        orgWeeklyReport: 0,
        orgMonthlyReport: 0,
      },
    }
  },
  created () {
    getCount().then(({ data }) => {
      this.countObj = data.data
    })
  },
  methods: {
    handleClick (row) {
      if (row.disabled) return
      this.$router.push({
        path: `/wel/${row.routerPath}`,
        query: { name: row.name },
      })
      this.$emit('select', row.name)
    },
  },
}
</script>
<style lang="scss" scoped>
.leader-top {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  height: auto;
  .leader-item {
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
    }
  }
  .info,
  .num {
    display: block;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .num {
    padding: 10px;
    font-size: 24px;
    text-align: center;
  }
  .sub-title {
    font-size: 16px;
  }
  .time {
    padding: 0 5px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
  }
}
</style>
<style lang="css" scoped>
.leader-top >>> .el-card__body {
  padding: 0 15px;
}
.leader-top >>> .el-card {
  padding: 0;
}
</style>
