<template>
  <div class="study">
    <el-carousel :interval="5000" arrow="always">
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
        { name: '国脉海洋信息发展有限公司', img: '../../img/department/d1.jpg' },
        { name: '国脉湖南子公司', img: '../../img/department/d2.jpg' },
        { name: '集团平台运营中心', img: '../../img/department/d3.jpg' },
        { name: '集团研发中心', img: '../../img/department/d4.jpg' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.study {
  padding-top: 15px;
  .piece {
    text-align: center;
    width: 238px;
    float: left;
    margin: 0 17px;
    cursor: pointer;
    .img {
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
      margin: 0 22px 0 27px;
    }
  }
}
</style>
<style scoped>
.study >>> .el-carousel__container {
  height: 180px;
}
</style>