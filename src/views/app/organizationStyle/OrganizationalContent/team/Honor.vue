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
    width: 238px;
    text-align: center;
    overflow: hidden;
    height: 100%;
    .imgs {
      width: 100%;
      height: 142px;
      overflow: hidden;
      img {
        width: 100%;
        height: 142px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .name {
      line-height: 40px;
    }
    &:first-child {
      margin: 0 27px 0 22px;
    }
    &:last-child {
      margin: 0 27px 0 27px;
    }
  }
}
</style>
<style scoped>
.empolyee >>> .el-carousel__container {
  height: 180px;
}
</style>
