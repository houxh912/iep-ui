<template>
  <div class="dev-ops">
    <el-card shadow="never">
      <span class="sub-title">内网运维</span>
      <div class="con">
        <div class="item" v-for="item in itemList" :key="item.id">
          <span class="sum">{{item.sum}}</span>
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemList: [
        {
          sum: '1325',
          name: '系统账户余额',
        },
        {
          sum: '600',
          name: '发行数',
        },
        {
          sum: '1325',
          name: '内部往来账',
        },
        {
          sum: '1325',
          name: '系统支出',
        },
        {
          sum: '540',
          name: '系统收入',
        },
        {
          sum: '240',
          name: '提现数',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.dev-ops {
  .con {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: 2fr 2fr;
    height: 90%;
    .item {
      text-align: center;
    }
    .sum {
      display: block;
      font-size: 24px;
    }
    .name {
      display: block;
      margin-top: 6px;
      color: #999;
    }
  }
}
</style>
<style scoped>
.dev-ops >>> .el-card__body {
  height: 406px;
}
.dev-ops >>> .sub-title {
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
