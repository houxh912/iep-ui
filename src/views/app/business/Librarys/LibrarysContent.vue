<template>
  <div class="librarys-content">
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index">
      <div class="title">
        <h4 class="name">{{item.name}}</h4>
        <i :class="item.icon" v-if="item.icon"></i>
      </div>
      <p class="desc" v-text="item.desc">
      </p>
      <div class="librarys-bottom">
        <span class="reserve">对接人：{{item.reserve}}</span>
        <span><i class="icon-shijian"></i>{{item.time}}</span>
        <span><i class="icon-yanjing"></i>{{item.browse}}</span>
        <span><i class="icon-download"></i>{{item.download}}</span>
        <div class="tags">
          <span v-for="(item,index) in tags" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      librarys:[
        {
          name:'佛山市市场监督管理局信息规划',
          icon:'icon-fujian',
          desc:'数据基因市指基于数据元和元数据的标准化编码基础上可实现数据自由编程、抽取、复制和关联应用的核心技术体系。它是实现数据跨系统共享交换、创新应用的底层逻辑和关键。',
          reserve: '郑国庆',
          time:'2019-03-13',
          browse:'111人浏览',
          download:'35人下载',
        },
        {
          name:'佛山市市场监督管理局信息规划',
          icon:'',
          desc:'数据基因市指基于数据元和元数据的标准化编码基础上可实现数据自由编程、抽取、复制和关联应用的核心技术体系。它是实现数据跨系统共享交换、创新应用的底层逻辑和关键。',
          reserve: '郑国庆',
          time:'2019-03-13',
          browse:'111人浏览',
          download:'35人下载',
        },
        {
          name:'佛山市市场监督管理局信息规划',
          icon:'icon-fujian',
          desc:'数据基因市指基于数据元和元数据的标准化编码基础上可实现数据自由编程、抽取、复制和关联应用的核心技术体系。它是实现数据跨系统共享交换、创新应用的底层逻辑和关键。',
          reserve: '郑国庆',
          time:'2019-03-13',
          browse:'111人浏览',
          download:'35人下载',
        },
        {
          name:'佛山市市场监督管理局信息规划',
          icon:'icon-fujian',
          desc:'数据基因市指基于数据元和元数据的标准化编码基础上可实现数据自由编程、抽取、复制和关联应用的核心技术体系。它是实现数据跨系统共享交换、创新应用的底层逻辑和关键。',
          reserve: '郑国庆',
          time:'2019-03-13',
          browse:'111人浏览',
          download:'35人下载',
        },
      ],
      tags:['数据平台','数据对接','数据资源'],
    }
  },
}
</script>
<style scoped lang="scss">
.librarys-item{
  padding: 20px 15px;
  border-bottom: 1px solid #ccc;
}
.title{
  height: 40px;
  line-height: 40px;
  .name{
    display:inline-block;
    margin-right: 10px;
    color: #333;
    font-size: 16px;
  }
  i{
    color: #666;
    font-size: 20px!important;
    vertical-align: -2px;
  }
}
.desc{
  margin-bottom: 15px;
  font-size: 14px;
  color:#666;
  line-height: 28px;
}
.librarys-bottom{
  &>span{
    margin-right: 15px;
    color:#999;
    font-size: 12px;
    i{
      margin-right: 5px;
      font-size: 18px!important;
      vertical-align: -2px;
    }
  }
  .reserve{
    font-size: 14px;
  }
  .tags{
    display: inline-block;
    span{
      padding: 3px 5px;
      margin-right: 8px;
      font-size: 12px;
      color:#999;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  }
}

</style>
