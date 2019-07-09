<template>
  <div class="banner">
    <el-card class="banner-list" shadow="hover" v-for="banner in bannerList" :key="banner.id">
      <span class="title">{{banner.title}}</span>
      <iep-img class="img" :src="banner.img" alt="" @click.native="handleDetail(banner)"></iep-img>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bannerList: [
        {
          id: 8498,
          img: '../img/app/person/img_01.png',
          title: '2019年江西全省互联网+智慧政务研讨会在南昌召开，共谋下步发展',
        },
        {
          id: 8490,
          img: '../img/app/person/img_02.png',
          title: '国脉副总刘佳一行拜访中通服开展合作洽谈',
        },
        {
          id: 8493,
          img: '../img/app/person/img_03.png',
          title: '国脉集团助力2019数博会协办，总经理郑爱军受邀发表系列演讲',
        },
      ],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
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
  }
  .banner-list:nth-child(2) {
    grid-column: 6 / 8;
    grid-row: 1 / 5;
  }
  .banner-list:nth-child(3) {
    grid-column: 6 / 8;
    grid-row: 5/ 9;
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

