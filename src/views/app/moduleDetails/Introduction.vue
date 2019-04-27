<template>
  <div class="introduction">
    <el-card shadow="hover" class="introduction-card">
      <div class="left">
        <i class="iconfont" :class="icon"></i>
      </div>
      <div class="right">
        <div class="title">
          <span class="name">{{name}}</span>
          <span class="status">{{status}}</span>
        </div>
        <div class="tag">
          <span v-for="(item,index) in tag" :key="index">{{item}}</span>
        </div>
        <span class="updateTime">更新时间：{{updateTime}}</span>
        <el-button class="join">加入定制</el-button>
        <el-button class="use">立即使用</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      icon: 'icon-tongyongleiziyuanpeizhi',
      name: '资源配置模块',
      status: '已完成',
      tag: ['产品设计', '项目管理', '原型设计', '平台规划', '需求分析', '流程设计', '产品培训', '需求文档'],
      updateTime: '2019-04-26 15:30',
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.introduction {
  .introduction-card {
    padding: 30px;
  }
  .left {
    width: 160px;
    height: 160px;
    line-height: 160px;
    border: 1px solid #ebeaea;
    border-radius: 2px;
    background-color: #f8f8f8;
    text-align: center;
    margin-right: 30px;
    float: left;
    > i {
      font-size: 60px;
      color: #999;
    }
  }
  .right {
    float: left;
    width: 940px;
    position: relative;
    .title {
      height: 60px;
      line-height: 60px;
      .name {
        font-size: 20px;
        color: #333;
      }
      .status {
        background: #f8f8f8;
        border-radius: 12px;
        padding: 2px 10px;
        border: 1px solid #ebeaea;
        margin-left: 10px;
      }
    }
    .tag {
      > span {
        display: inline;
        list-style: none;
        border: 1px solid #ebeaea;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 5px;
        color: #999;
      }
    }
    .updateTime {
      height: 60px;
      line-height: 60px;
      color: #999;
    }
    .join,
    .use {
      position: absolute;
      top: 0;
    }
    .join {
      right: 110px;
      background-color: #ba1b21;
      border: 1px solid #ba1b21;
      color: #fff;
      transition: all 0.5s;
      &:hover {
        background-color: #fff;
        border: 1px solid #ba1b21;
        color: #ba1b21;
      }
    }
    .use {
      right: 0;
      background-color: #fff;
      border: 1px solid #ba1b21;
      color: #ba1b21;
      transition: all 0.5s;
      &:hover {
        background-color: #ba1b21;
        border: 1px solid #ba1b21;
        color: #fff;
      }
    }
  }
}
</style>
<style scoped>
.introduction >>> .el-card__body {
  padding: 0;
}
</style>
