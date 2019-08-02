<template>
  <div class="govmade">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
        <div class="piece" v-for="item in item.childList" :key="item.id">
          <div class="img">
            <iep-img :src="item.img" alt="" class="img"></iep-img>
          </div>
          <span class="sub-title name">{{ item.subtitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemList: [{
        childList: [
          {
            id: '1',
            img: require('../images/video1.jpg'),
            subtitle: '宣传片1',
          },
          {
            id: '2',
            img: require('../images/video2.jpg'),
            subtitle: '宣传片2',
          },
          {
            id: '3',
            img: require('../images/video3.jpg'),
            subtitle: '宣传片3',
          },
          {
            id: '4',
            img: require('../images/video4.jpg'),
            subtitle: '宣传片4',
          }],
      },
      {
        childList: [
          {
            id: '5',
            img: '../../img/department/d5.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '6',
            img: '../../img/department/d2.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '7',
            img: '../../img/department/d3.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '8',
            img: '../../img/department/d4.jpg',
            subtitle: '集团平台运营中心',
          },
        ],
      }],
    }
  },
}
</script>

<style scoped lang="scss">
.govmade {
  .piece {
    text-align: center;
    width: 238px;
    float: left;
    margin: 0 17px;
    .img {
      width: 100%;
      height: 142px;
      overflow: hidden;
      .img {
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
.govmade >>> .el-carousel__container {
  height: 180px;
}
</style>

