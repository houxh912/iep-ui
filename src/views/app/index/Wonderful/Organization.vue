<template>
  <div class="Organization">
    <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
      <img :src="item.img" class="img">
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wonderfulList: [
        { name: '国脉先锋队', img: require('../img/国脉先锋队.jpg') },
        { name: '国脉集团研发中心', img: require('../img/国脉集团研发中心.jpg') },
        { name: '佛山司马钱信息技术有限公司', img: require('../img/佛山司马钱信息技术有限公司.jpg') },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.Organization {
  padding: 15px 20px;
  .piece {
    text-align: center;
    width: 270px;
    float: left;
    margin: 0 10px;
    .img {
      width: 100%;
      height: 165px;
    }
    .name {
      line-height: 40px;
    }
    &:first-child {
      margin: 0 25px 0 10px;
    }
    &:last-child {
      margin: 0 10px 0 25px;
    }
  }
}
</style>
