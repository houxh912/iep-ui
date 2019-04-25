<template>
  <div class="librarys-content">
    <div v-for="(item,index) in dataList" :key="index" class="piece">
      <div class="title">
        <h4 class="name">{{item.name}}</h4>
        <i class="iconfont icon-caifu"></i>
        <i class="iconfont icon-fujian"></i>
      </div>
      <p>{{item.desc}}</p>
      <div class="box">
        <span class="uploaded" >上传者：{{item.uploaded}}</span>
        <span><i class="iconfont icon-shijian"></i>{{item.time}}</span>
        <span><i class="iconfont icon-yanjing"></i>{{item.pageviews}}人浏览</span>
        <span><i class="iconfont icon-download"></i>{{item.downloads}}人下载</span>
      </div>
      <div v-for="(item,index) in item.label" :key="index" class="label">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        {name:'国脉数据基因政务大数据整体解决方案',desc:'数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系',uploaded:'胡世军',time:'2019-04-24',pageviews:'145',downloads:'88',label:['创业女杰','浙商','创新创业']},
        {name:'国脉数据基因政务大数据整体解决方案',desc:'数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系',uploaded:'胡世军',time:'2019-04-24',pageviews:'145',downloads:'88',label:['创业女杰','浙商','创新创业']},
        {name:'国脉数据基因政务大数据整体解决方案',desc:'数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系',uploaded:'胡世军',time:'2019-04-24',pageviews:'145',downloads:'88',label:['创业女杰','浙商','创新创业']},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.piece{
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  &>p{
    font-size: 14px;
    color:#666;
    line-height: 28px;
  }
}
.title{
  .name{
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
    color:#000;
  }
  i{
    margin-right:10px;
    font-size: 22px;
    color:#aaa;
    vertical-align: -2px;
  }
}
.box{
  margin-bottom: 15px;
  span{
    margin-right: 20px;
    color:#aaa;
    i{
      margin-right:5px;
      font-size: 18px;
      color:#aaa;
      vertical-align: -2px;
    }
  }
}
.label{
  display: inline-block;
  margin-bottom: 15px;
  &>span{
    margin-right: 10px;
    padding:5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    &:hover{
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
      cursor: pointer;
    }
  }
  
}
</style>
