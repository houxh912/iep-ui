<template>
  <div class="leader-top">
    <el-card v-for="item in itemList" :key="item.id" shadow="hover">
      <span class="info" @click="handleClick(item)">
        <span class="sub-title">{{item.title}}</span><span class="time" :style="item.bgc">{{item.time}}</span>
      </span>
      <span class="num" @click="handleClick(item)">{{item.num}}</span>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'leader-top',
      itemList: [
        {
          id:1,
          routerPath:'visiting_log',
          title: '拜訪日志',
          time: '全年',
          num: '15',
          bgc: {
            background: '#d7ba9a',
          },
        },
        {
          id:2,
          routerPath:'staff_report',
          title: '员工周报',
          time: '本周',
          num: '530',
          bgc: {
            background: '#89c7d6',
          },
        },
        {
          id:3,
          routerPath:'staff_report',
          title: '员工月报',
          time: '本月',
          num: '188',
          bgc: {
            background: '#dbadad',
          },
        },
        {
          id:4,
          routerPath:'project_report',         
          title: '项目周报',
          time: '本周',
          num: '9',
          bgc: {
            background: '#d7ba9a',
          },
        },
        {
          id:5,
          routerPath:'origanaze_report',         
          title: '部门周报',
          time: '本周',
          num: '34',
          bgc: {
            background: '#89c7d6',
          },
        },
        {
          id:6,
          routerPath:'origanaze_report',
          title: '部门月报',
          time: '本月',
          num: '34',
          bgc: {
            background: '#dbadad',
          },
        },
      ],
    }
  },
  methods: {
    handleClick (row) {
      this.$router.push({
        path:`/wel/${row.routerPath}`,
      })
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
  .info,
  .num {
    display: block;
    cursor: pointer;
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
