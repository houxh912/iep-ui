<template>
  <div class="navContent">
    <iep-no-data v-if="!contentData.length" message="暂无内容"></iep-no-data>
    <el-row v-else v-for="(item,index) in contentData" :key="index">
      <el-col :span="14">
        <div class="iep-ellipsis title" @click="handleDetail(item)">{{item.name}}</div>
      </el-col>
      <el-col :span="6" v-if="item.subName">
        <div class="iep-ellipsis">{{item.subName}}</div>
      </el-col>
      <el-col :span="6" v-if="item.process">
        <el-progress :percentage="item.process" color="#68C769"></el-progress>
      </el-col>
      <el-col :span="4">
        <div class="iep-ellipsis text-right text-time">{{item.time | parseToMonthDay}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    contentData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleDetail (row) {
      this.$emit('on-detail', row)
    },
  },
}
</script>

<style lang="scss" scoped>
.navContent {
  padding: 10px 0;
  .el-row {
    padding: 5px 0;
    color: #5f5f5f;
    .title {
      margin-right: 10px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      &:hover {
        color: $--menu-color-primary;
      }
    }
    .el-progress {
      width: 120px;
    }
    .text-right {
      text-align: right;
    }
    .text-time {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>