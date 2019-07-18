<template>
  <div class="empolyee">
    <el-carousel height="200px" :interval="2000000000000" indicator-position="none">
      <el-carousel-item v-for="item in 4" :key="item">
        <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
          <div class="img">
            <iep-img :src="item.img" class="img"></iep-img>
          </div>
          <span class="name">{{item.name}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wonderfulList: [
        { name: '国脉先锋队', img: require('../img/organization1.jpg') },
        { name: '国脉集团研发中心', img: require('../img/organization2.jpg') },
        { name: '佛山司马钱信息技术有限公司', img: require('../img/organization3.jpg') },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  .piece {
    text-align: center;
    width: 268px;
    float: left;
    margin: 0 5px;
    cursor: pointer;
    .img {
      width: 100%;
      height: 160px;
      overflow: hidden;
      img {
        width: 100%;
        height: 160px;
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
      margin: 0 15px 0 0;
    }
    &:last-child {
      margin: 0 -1px 0 15px;
    }
  }
}
</style>
<style scoped>
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
