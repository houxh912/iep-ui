<template>
  <div class="products">
    <div v-for="(item,index) in productsList" :key="index" class="piece">
      <div class="img"><img :src="item.img" :alt="item.name"></div>
      <div class="box">
        <span class="name">{{item.name}}</span>
        <span class="desc">{{item.desc}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productsList: [
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
        { img: require('../img/chanpin1.jpg'), name: '数据基因', desc: '数据基因系统是是通过管理标准化实现元数据规范编辑、智能管理、关联应用和共享开放，以提升全域数据资源' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.products{
  height: 340px;
  overflow-y: scroll;
  padding-left: 15px;
  .piece{
    overflow: hidden;
    margin-bottom: 15px;
  }
  .img{
    width: 140px;
    height: 80px;
    float: left;
    margin: 0 15px 0 0;
    overflow: hidden;
    img {
      width: 140px;
      height: 80px;
      transition: 0.5s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  .box{
    width: 300px;
    height: 80px;
    float: left;
    .name{
      width: 100%;
      font-size: 16px;
      height: 36px;
      line-height: 36px;
    }
    .desc{
      width: 100%;
      line-height: 20px;
      font-size: 14px;
      color: #999;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
