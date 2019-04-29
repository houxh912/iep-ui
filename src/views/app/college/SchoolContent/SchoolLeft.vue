<template>
  <div class="school-left">
    <el-carousel :interval="5000">
      <el-carousel-item v-for="(item,index) in banerImg" :key="index">
        <img :src="item" class="baner-img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      banerImg: [
        require('../img/banner1.jpg'),
        require('../img/banner3.jpg'),
      ],
    }
  },
}
</script>
<style scoped>
.el-carousel >>> .el-carousel__container {
  height: 390px;
}
</style>
