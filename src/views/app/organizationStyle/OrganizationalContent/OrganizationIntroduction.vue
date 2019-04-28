<template>
  <div class="organization-introduction">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <p class="con">国脉集团研发中心定位于集团技术支撑大本营，主要发展思路为：以集团五位一体发展战略为指导，以国脉品牌与资源为依托，整合技术资源，全力支持</p>
      <div class="person">
        <el-carousel height="84px" :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
              <div class="img"><img :src="item.img" class="img"></div>
              <span class="name">{{item.name}}<span class="dn show1" :class="item.show1">V</span></span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '组织介绍',
      data: '（当前234人）',
      wonderfulList: [
        { img: require('../img/people1.png'), name: '姚静', show1: 'show' },
        { img: require('../img/people2.jpg'), name: '邵佳欢' },
        { img: require('../img/people3.jpg'), name: '林毅宁' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.organization-introduction {
  margin-bottom: 30px;
  .con {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .person {
    padding-top: 15px;
    overflow: hidden;
    .dn {
      opacity: 0;
    }
    .show {
      opacity: 1;
    }
    .show1 {
      display: inline-block;
      margin: 0 5px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      background-color: #cb3737;
      color: #fff;
    }
    .name {
      line-height: 24px;
    }
    .piece {
      float: left;
      margin: 0 5px;
      width: 60px;
      text-align: center;
      overflow: hidden;
      .img {
        width: 100%;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 60px;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            cursor: pointer;
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>

<style scoped>
.person >>> .el-carousel__arrow--left {
  left: 0;
}
.person >>> .el-carousel__arrow--right {
  right: 0;
}
.person >>> .el-carousel__item {
  left: 40px;
}
.person >>> .el-carousel__indicators {
  display: none;
}
</style>