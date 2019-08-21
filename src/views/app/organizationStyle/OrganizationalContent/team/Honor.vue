<template>
  <div class="empolyee">
    <el-carousel height="165px" :interval="5000" arrow="always" v-if="list.length !== 0">
      <el-carousel-item v-for="(item, index) in Math.ceil(list.length/5)" :key="index">
        <div v-for="(t, i) in list.slice(index*5, (index+1)*5)" :key="i" class="piece">
          <div class="img">
            <iep-img :src="t.image" class="img"></iep-img>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <IepNoData v-else></IepNoData>
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
    margin: 0 17px;
    width: 245px;
    text-align: center;
    overflow: hidden;
    height: 100%;
    .imgs {
      .img {
        width: 100%;
        height: 142px;
        overflow: hidden;
        cursor: pointer;
      }
    }
    .name {
      line-height: 40px;
    }
  }
}
</style>
<style scoped>
.empolyee >>> .el-carousel__container {
  height: 180px;
}
.empolyee >>> .el-image__inner {
  width: 100%;
  height: 142px;
  transition: 0.5s;
}
.empolyee >>> .el-image__inner:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
