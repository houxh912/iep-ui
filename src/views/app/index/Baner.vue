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
          pathId: 1,
        },
        {
          img: '../img/app/index/img_02.png',
          pathId: 1,
        },
        {
          img: '../img/app/index/img_03.jpg',
          pathId: 1,
        },
        {
          img: '../img/app/index/img_04.jpg',
          pathId: 1,
        },
      ],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.pathId}`)
    },
  },
}
</script>
<style scoped>
.el-carousel >>> .el-carousel__container {
  height: 288px;
}
</style>

<style lang="scss" scoped>
.index-card {
  height: 288px;
  .baner-box {
    height: 288px;
    .img {
      width: 100%;
      height: 288px;
    }
  }
}
</style>
