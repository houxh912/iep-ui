<template>
  <div class="librarys-content">
    <div v-for="item in dataList" :key="item" class="piece">
      <div class="title">
        <h4 class="name">{{item.name}}</h4><i class="iconfont icon-caifu"></i> <i class="iconfont icon-fujian"></i>
      </div>
      <p>{{item.desc}}</p>
      <div class="box">
        <span>上传者：{{item.uploaded}}</span>
        <span><i class="iconfont icon-shijian"></i>{{item.time}}</span>
        <span><i class="iconfont icon-yanjing"></i>{{item.pageviews}}人浏览</span>
        <span><i class="iconfont icon-download"></i>{{item.downloads}}人下载</span>
      </div>
      <div v-for="label in item.label" :key="label" class="label">
        <span>{{label}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        {name:'国脉数据基因政务大数据整体解决方案',desc:'aaaa',uploaded:'胡世军',time:'2019-04-24',pageviews:'145',downloads:'88',label:['创业女杰','浙商','创新创业']},
        {name:'国脉数据基因政务大数据整体解决方案',desc:'aaaa',uploaded:'胡世军',time:'2019-04-24',pageviews:'145',downloads:'88',label:['创业女杰','浙商','创新创业']},
        {name:'国脉数据基因政务大数据整体解决方案',desc:'aaaa',uploaded:'胡世军',time:'2019-04-24',pageviews:'145',downloads:'88',label:['创业女杰','浙商','创新创业']},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.title{
  .name{
    display: inline-block;
  }
}
.box{
}
.label{
  display: inline-block;
}
</style>
