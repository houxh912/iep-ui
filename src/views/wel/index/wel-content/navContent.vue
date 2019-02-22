<template>
  <div class="navContent">
    <el-row v-for="(item,index) in contentData" :key="index">
      <el-col :span="16">
        <div class="grid-content bg-purple title">{{item.title}}</div>
      </el-col>
      <el-col :span="6" v-if="item.author">
        <div class="grid-content bg-purple">{{item.author}}</div>
      </el-col>
      <el-col :span="6" v-if="item.process">
        <el-progress :percentage="item.process" color="#68C769"></el-progress>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple text-right">{{item.date}}</div>
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
  padding: 20px 0;
  .el-row {
    padding: 5px 0;
    color: #5f5f5f;
    .title {
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    .el-progress {
      width: 120px;
    }
    .text-right {
      text-align: right;
    }
  }
}
</style>
