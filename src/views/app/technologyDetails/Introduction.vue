<template>
  <div class="introduction">
    <div class="left">
      <img :src="img" :alt="name">
    </div>
    <div class="right">
      <div class="title">
        <span class="name">{{name}}</span>
        <span class="status">{{status}}</span>
      </div>
      <div class="tag">
        <span v-for="(item,index) in tag" :key="index" >{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img:require('./img/ant.svg'),
      name:'Ant Design Pro',
      status: '已完成',
      tag:['产品设计','项目管理','原型设计','平台规划','需求分析','流程设计','产品培训','需求文档'],
      updateTime:'2019-04-26 15:30',
    }
  },
}
</script>
<style lang="scss" scoped>
.introduction {
  overflow: hidden;
  .left{
    width: 80px;
    height: 80px;
    border: 1px solid #ebeaea;
    border-radius: 2px;
    background-color: #f8f8f8;
    text-align: center;
    margin-right: 30px;
    float: left;
    > img{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    float: left;
    width:770px;
    .title{
      height: 50px;
      line-height: 40px;
      .name{
        font-size: 20px;
        color: #333;
      }
      .status{
        background: #f8f8f8;
        border-radius: 12px;
        padding: 2px 10px;
        border: 1px solid #ebeaea;
        margin-left: 10px;
      }
    }
    .tag{
      > span{
        display: inline;
        list-style: none;
        border: 1px solid #ebeaea;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 5px;
        color: #999;
      }
    }
  }
}
</style>
<style scoped>
.introduction >>> .el-card__body{
  padding: 0;
}
</style>
