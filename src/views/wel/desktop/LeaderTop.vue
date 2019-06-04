<template>
  <div class="leader-top">
    <el-card v-for="item in itemList" :key="item.id" shadow="hover">
      <span class="info">
        <span class="sub-title">{{item.title}}</span><span class="time" :style="item.bgc">{{item.time}}</span>
      </span>
      <span class="num">{{item.num}}</span>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'leader-top',
      itemList: [
        {
          title: '拜訪日志',
          time: '全年',
          num: '15',
          bgc: {
            background: '#d7ba9a',
          },
        },
        {
          title: '员工周报',
          time: '全年',
          num: '530',
          bgc: {
            background: '#89c7d6',
          },
        },
        {
          title: '员工月报',
          time: '今日',
          num: '188',
          bgc: {
            background: '#dbadad',
          },
        },
        {
          title: '项目周报',
          time: '今日',
          num: '9',
          bgc: {
            background: '#d7ba9a',
          },
        },
        {
          title: '部门周报',
          time: '今日',
          num: '34',
          bgc: {
            background: '#89c7d6',
          },
        },
        {
          title: '部门月报',
          time: '今日',
          num: '34',
          bgc: {
            background: '#dbadad',
          },
        },
      ],
    }
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
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .num {
    padding-bottom: 10px;
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
  padding: 10px;
}
</style>
