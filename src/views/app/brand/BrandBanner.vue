<template>
  <div class="brand-banner">
    <div class="banner-item" v-for="(item,index) in banner" :key="index">
      <div class="grid-content">
        <img style="width:100%;height:150px;" :src="item.imgSrc" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      banner: [
        { imgSrc: require('./images/banner1.png') },
        { imgSrc: require('./images/banner2.jpg') },
        { imgSrc: require('./images/banner3.jpg') },
      ],
    }
  },
}
</script>
<style scoped lang='scss'>
.brand-banner {
  display: flex;
  grid-column-start: 1;
  grid-column-end: 4;
  .banner-item{
    width: 33.333%;
    margin: 0 15px;
      .grid-content {
        width: 100%;
      }
  }
}
</style>
