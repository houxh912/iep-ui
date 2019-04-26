
<template>
  <div class="all-versions">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <div class="piece" v-for="(item,index) in dataList" :key="index">
      <div>
        <i class="iconfont" :class="item.icon"></i>
      </div>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title:'应用模块',
      dataList: [
        {icon:'icon-tongyongleiziyuanpeizhi',name:'资源配置模块'},
        {icon:'icon-tongyongleiziyuanpeizhi',name:'资源配置模块'},
        {icon:'icon-tongyongleiziyuanpeizhi',name:'资源配置模块'},
        {icon:'icon-tongyongleiziyuanpeizhi',name:'资源配置模块'},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.all-versions{
  overflow: hidden;
  border-top: 1px solid #f5f5f5;
  margin-top:20px;
  .title{
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    color: #333;
  }
  .piece{
    float: left;
    width: 100px;
    margin-right: 30px;
    > div{
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border: 1px solid #dcdcdc;
      margin: 0 auto;
      > i{
        font-size: 40px;
        color: #999;
      }
    }
    span{
      width: 1005;
      height: 36px;
      line-height: 36px;
      text-align: center;
      display: block;
    }
  }
}
</style>
<style scoped>
</style>
