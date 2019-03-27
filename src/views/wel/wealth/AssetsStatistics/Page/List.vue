<template>
  <div class="list">
    <operation-container>
      <template slot="left">
        <page-header title="财富统计-类型" :replaceText="replaceText" :data="[10 ,5]"></page-header>
      </template>
      <template slot="right">
        <div class="time">
          <div class="time-text">
            <span>昨日</span>
            <span>今日</span>
            <span>本周</span>
            <span>本月</span>
            <span class="active">全年</span>
          </div>
          <div class="block">
            <el-date-picker v-model="value6" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </template>
    </operation-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      replaceText: (data) => `（收入共计${data[0]}笔，共计${data[0]}贝）`,
      value6: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .time-text {
    span {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    span.active {
      color: #cb3737;
    }
  }
  .block {
    width: 40%;
  }
}
.operation-container {
  border: 1px solid #ebeef5;
  padding: 20px;
}
</style>
