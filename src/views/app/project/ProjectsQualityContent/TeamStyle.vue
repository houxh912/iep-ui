<template>
  <IepAppTabCard :title="title">
    <div class="empolyee">
      <el-carousel height="200px" :interval="5000" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
            <div class="img"><img :src="item.img" class="img"></div>
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
        { name: '数据基因项目组', img: require('../img/pr1.jpg') },
        { name: '营商通项目组', img: require('../img/pr2.jpg') },
        { name: '营商通项目组', img: require('../img/pr3.jpg') },
        { name: '营商环境项目组', img: require('../img/pr4.jpg') },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  padding-top: 15px;
  .piece {
    text-align: center;
    width: 260px;
    float: left;
    margin: 0 5px;
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
    .name {
      line-height: 40px;
    }
    &:first-child {
      margin: 0 15px 0 10px;
    }
    &:last-child {
      margin: 0 10px 0 15px;
    }
  }
}
</style>