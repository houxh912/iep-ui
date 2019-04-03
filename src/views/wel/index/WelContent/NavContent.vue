<template>
  <div class="navContent">
    <el-row v-for="(item,index) in contentData" :key="index">
      <el-col :span="16">
        <div class="grid-content title">{{item.title}}</div>
      </el-col>
      <el-col :span="6" v-if="item.author">
        <div class="grid-content">{{item.author}}</div>
      </el-col>
      <el-col :span="6" v-if="item.process">
        <el-progress :percentage="item.process" color="#68C769"></el-progress>
      </el-col>
      <el-col :span="2">
        <div class="grid-content text-right text-time">{{item.date}}</div>
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
  created () {
    // console.log(this.content)
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
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    .grid-content {
      font-size: 14px;
    }
    .el-progress {
      width: 120px;
    }
    .text-right {
      text-align: right;
    }
    .text-time {
      color: #999;
    }
  }
}
</style>
