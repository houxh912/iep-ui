<template>
  <div class="messagecon">
    <h5>分类</h5>
    <div class="line"></div>
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="提醒">
        <component @onDetail="handleDetail" @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
      </el-tab-pane>
      <el-tab-pane label="纪要"></el-tab-pane>
      <el-tab-pane label="任务">角色管理</el-tab-pane>
      <el-tab-pane label="审批">定时任务补偿</el-tab-pane>
      <el-tab-pane label="财富">定时任务补偿</el-tab-pane>
      <el-tab-pane label="其他">定时任务补偿</el-tab-pane>
      <el-tab-pane label="星标">定时任务补偿</el-tab-pane>
      <el-tab-pane label="系统消息">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 动态切换组件
import List from './SystemMessage/Page/List'
import Edit from './SystemMessage/Page/Edit'
import Detail from './SystemMessage/Page/Detail'
export default {
  name: 'message',
  data () {
    return {
      tabPosition: 'left',
      currentComponet: 'List',
      record: '',
    }
  },
  components: {
    List,
    Edit,
    Detail,
  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.currentComponet = 'Edit'
    },
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    handleDetail (record) {
      this.record = record
      this.currentComponet = 'Detail'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
}
</script>
<style lang="scss" scoped>
.messagecon {
  position: relative;
  height: 100%;
  h5 {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 15px;
  }
  .line {
    position: absolute;
    top: 0;
    left: 199px;
    bottom: 0;
    width: 1px;
    background-color: #e4e7ed;
    z-index: 10;
  }
}
</style>
<style lang="css" scoped>
.messagecon >>> .el-tabs--left {
  height: 100% !important;
}
.messagecon >>> .el-tabs--left .el-tabs__header.is-left {
  margin-top: 40px;
}
.messagecon >>> .el-tabs--left .el-tabs__item.is-left {
  border-right: 1px solid #fff;
  min-width: 180px;
  text-align: left;
}
.messagecon >>> .el-tabs__item.is-active {
  border-right: 1px solid #e4e7ed;
  background-color: #fafafa;
  color: #333;
}
.messagecon >>> .el-tabs__item:hover {
  border-right: 1px solid #e4e7ed;
  background-color: #fafafa;
  color: #333;
}
.messagecon >>> .el-tabs__active-bar {
  width: 1px;
  background-color: #e4e7ed;
}
.messagecon >>> .el-tabs__nav-wrap::after {
  width: 0;
}
.messagecon >>> .el-tabs__content {
  padding-left: 10px;
}
</style>
