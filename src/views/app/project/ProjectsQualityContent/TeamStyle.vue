<template>
  <IepAppTabCard :title="title">
    <div class="empolyee">
      <el-carousel height="180px" :interval="5000" arrow="always">
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
  </IepAppTabCard>
</template>

<script>
export default {
  data () {
    return {
      title: '项目团队风采',
      wonderfulList: [
        { name: '数据基因项目组', img: '../img/person/p6.jpg' },
        { name: '营商通项目组', img: '../img/person/p5.jpg' },
        { name: '营商通项目组', img: '../img/person/p2.jpg' },
        { name: '营商环境项目组', img: '../img/person/p9.jpg' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
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
    &:hover .name {
      color: #cb3737;
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
.empolyee >>> .el-card {
  height: 280px;
}
.empolyee >>> .el-carousel__arrow {
  background: none;
}
.empolyee >>> .el-carousel__arrow i {
  font-size: 36px;
  color: #666;
}
.empolyee >>> .el-carousel__item {
  left: 25px;
  width: 96%;
}
.empolyee >>> .el-carousel__arrow--left {
  left: -10px;
}
.empolyee >>> .el-carousel__arrow--right {
  right: -10px;
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