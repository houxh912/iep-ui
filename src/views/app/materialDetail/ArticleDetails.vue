<template>
  <div class="article-details">
    <div class="title">{{name}}</div>
    <div class="inform">
      <img :src="avatar" :alt="name">
      <span>{{uploaded}}</span>
      <span>{{time}}</span>
      <span><i class="iconfont icon-yanjing"></i>{{pageviews}}</span>
      <span><i class="iconfont icon-download1"></i>{{downloads}}</span>
      <div class="btn sc"><i class="iconfont icon-shoucang"></i>收藏</div>
      <div class="btn fx"><i class="iconfont icon-youxiangshixin"></i>分享</div>
      <div class="btn jc"><i class="iconfont icon-zhuyi"></i>纠错</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '国脉数据基因政务大数据整体解决方案', 
      avatar: require('./img/people.png'),
      desc: '数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系', 
      uploaded: '胡世军', 
      time: '2019-04-24', 
      pageviews: '145', 
      downloads: '88', 
      label: ['创业女杰', '浙商', '创新创业'],
    }
  },
}
</script>
<style lang="scss" scoped>
.article-details{
  padding: 20px 0;
  .title{
    font-size: 18px;
    color: #333;
    height: 50px;
    line-height: 50px;
  }
  .inform{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    > img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: inline-block;
    }
    > span{
      margin-left: 10px;
      display: inline-block;
      >i{
        margin: 4px;
      }
      &:nth-child(4){
        margin-left: 30px;
      }
      &:nth-child(5){
        margin-left: 30px;
      }
    }
    .btn{
      position: absolute;
      top: 8px;
      font-size: 16px;
      color: #999;
      > i{
        margin: 4px;
      }
    }
    .sc{
      right: 150px;
    }
    .fx{
      right: 80px;
    }
    .jc{
      right: 10px;
    }
  }
}
</style>

