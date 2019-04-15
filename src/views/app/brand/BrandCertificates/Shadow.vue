<template>
  <div>
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
        <div class="department-list" v-for="item in item.childList" :key="item.id">
          <div class="img"><img :src="item.img" alt=""></div>
          <span class="sub-title">{{ item.subtitle }}</span>
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
            img: '../../img/department/d1.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '2',
            img: '../../img/department/d2.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '3',
            img: '../../img/department/d3.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '4',
            img: '../../img/department/d4.jpg',
            subtitle: '集团平台运营中心',
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

<style>
</style>
