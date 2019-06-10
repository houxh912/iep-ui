<template>
  <div class="products">
    <el-scrollbar style="height:100%">
      <div v-for="(item, index) in productsList" :key="index" class="piece">
        <div class="img"><iep-img :src="item.image_url" :alt="item.name"></iep-img></div>
        <div class="box">
          <span class="name">{{item.name}}</span>
          <span class="desc">{{item.synopsis}}</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { getDetailsIndex } from '@/api/app/cpms/channel'
export default {
  data () {
    return {
      productsList: [],
    }
  },
  methods: {
    loadList () {
      getDetailsIndex().then(({data}) => {
        this.productsList = data.data
      })
    },
  },
  created () {
    this.loadList()
  },
}
</script>

<style lang="scss" scoped>
.products{
  height: 304px;
  padding-left: 15px;
  .piece{
    overflow: hidden;
    margin-bottom: 15px;
    &:hover{
      cursor: pointer;
    }
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
    width: 355px;
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
