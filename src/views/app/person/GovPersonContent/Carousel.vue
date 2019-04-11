<template>
  <div class="carousel">
    <el-card class="index-card" shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="员工风采" name="first">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
              <div class="department-list" v-for="item in item.childList" :key="item.id">
                <div class="img"><img :src="item.img" alt=""></div>
                <span class="sub-title">{{ item.subtitle }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="培训学习" name="second">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
              <div class="department-list" v-for="item in item.childList" :key="item.id">
                <div class="img"><img :src="item.img" alt=""></div>
                <span class="sub-title">{{ item.subtitle }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="成果分享" name="third">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
              <div class="department-list" v-for="item in item.childList" :key="item.id">
                <div class="img"><img :src="item.img" alt=""></div>
                <span class="sub-title">{{ item.subtitle }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="团建活动" name="fourth">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
              <div class="department-list" v-for="item in item.childList" :key="item.id">
                <div class="img"><img :src="item.img" alt=""></div>
                <span class="sub-title">{{ item.subtitle }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      itemList: [{
        childList: [
          {
            id: '1',
            img: '../img/department/d1.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '2',
            img: '../img/department/d2.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '3',
            img: '../img/department/d3.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '4',
            img: '../img/department/d4.jpg',
            subtitle: '集团平台运营中心',
          }],
      },
      {
        childList: [
          {
            id: '5',
            img: '../img/department/d5.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '6',
            img: '../img/department/d2.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '7',
            img: '../img/department/d3.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '8',
            img: '../img/department/d4.jpg',
            subtitle: '集团平台运营中心',
          },
        ],
      }],
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
  },
}
</script>
<style lang="scss" sccoped>
.carousel {
  .el-carousel {
    overflow: hidden;
  }
  .department-con {
    margin: 18px 0;
    padding: 0 80px;
    white-space: nowrap;
    overflow: hidden;
    .department-list {
      display: inline-block;
      margin: 0 15px;
      width: 22%;
      overflow: hidden;
      height: 200px;
      text-align: center;
      .img {
        width: 100%;
        height: 140px;
        border: 1px solid #ebeef5;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
      .sub-title {
        display: block;
        margin: 10px 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
}
.el-carousel__container {
  height: 200px;
}
</style>