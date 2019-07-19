<template>
  <div class="baner">
    <el-carousel :interval="5000" class="index-card">
      <el-carousel-item v-for="(item,index) in img" :key="index" class="baner-box">
        <iep-img :src="item.img" class="img" @click.native="handleDetail(item)"></iep-img>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: [
        {
          img: '../img/app/index/img_01.jpg',
          pathId: 8451,
        },
        {
          img: '../img/app/index/img_02.png',
          pathId: 8465,
        },
        {
          img: '../img/app/index/img_03.jpg',
          pathName: 'http://www.echinagov.com/zt/szzf/',
        },
        {
          img: '../img/app/index/img_04.jpg',
          pathName: 'http://www.besticity.com/ZT/zhcs/',
        },
      ],
    }
  },
  methods: {
    handleDetail (row) {
      if (row.pathId) {
        this.$router.push(`/app/resource/material/material_detail/${row.pathId}`)
      } else {
        window.open(row.pathName)
      }
    },
  },
}
</script>
<style scoped>
.el-carousel >>> .el-carousel__container {
  height: 280px;
}
</style>

<style lang="scss" scoped>
.index-card {
  height: 280px;
  .baner-box {
    height: 280px;
    .img {
      width: 100%;
      height: 280px;
    }
  }
}
</style>
