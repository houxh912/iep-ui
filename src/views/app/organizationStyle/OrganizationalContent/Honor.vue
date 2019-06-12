<template>
  <div class="empolyee">
    <el-carousel height="165px" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="(item, index) in Math.ceil(list.length/5)" :key="index">
        <div v-for="(t, i) in list.slice(index*5, (index+1)*5)" :key="i" class="piece">
          <div class="img"><iep-img :src="t.image" class="img"></iep-img></div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  padding-top: 15px;
  .piece {
    float: left;
    margin: 0 5px;
    width: 130px;
    text-align: center;
    overflow: hidden;
    .img {
      width: 100%;
      height: 165px;
      overflow: hidden;
      img {
        width: 100%;
        height: 165px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
<style scoped>
.empolyee >>> .el-carousel__container {
  margin: 0 40px;
}
</style>
