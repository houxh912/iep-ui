<template>
  <div class="banner">
    <el-card class="banner-list" shadow="hover" v-for="banner in bannerList" :key="banner.id">
      <span class="title">{{banner.title}}</span>
      <iep-img class="img" :src="banner.image ? banner.image : image" alt="" @click.native="handleDetail(banner)"></iep-img>
    </el-card>
  </div>
</template>

<script>
import { getListBySiteId } from '@/api/conm/article_controller'
export default {
  data () {
    return {
      bannerList: [],
      image: '../img/app/person/image.jpg',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/news/news_detail/${row.id}`)
    },
  },
  created () {
    let params = {
      attributeNumber: 'gmrrec',
      siteId: 1,
      size: 3,
    }
    getListBySiteId(params).then(({ data }) => {
      this.bannerList = data.data
    })
  },
}
</script>
  <style lang="scss" scoped>
.banner {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  .banner-list {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .title {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      z-index: 10;
    }
  }
  .banner-list:nth-child(1) {
    grid-column: 1 / 5;
    grid-row: 1 / 9;
    .img {
      width: 576px;
      height: 359px;
    }
  }
  .banner-list:nth-child(2) {
    grid-column: 6 / 8;
    grid-row: 1 / 5;
    .img {
      width: 286px;
      height: 176px;
    }
  }
  .banner-list:nth-child(3) {
    grid-column: 6 / 8;
    grid-row: 5/ 9;
    .img {
      width: 286px;
      height: 178px;
    }
  }
}
</style>
<style scoped>
.banner >>> .el-card {
  border-radius: 0;
}
.banner >>> .el-card__body {
  padding: 0;
  width: 100%;
  height: 100%;
}
.banner >>> .el-image {
  width: 100%;
  height: 100%;
}
</style>

