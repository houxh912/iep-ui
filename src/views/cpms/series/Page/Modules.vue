<template>
  <div>
    <div class="module" v-for="(item,index) in 3" :key="index">
      <div class="img">
        <img :src="logo" alt="">
      </div>
      <div class="module-title">资源配置模块</div>
    </div>
  </div>
</template>
<script>
const logo = require('../logo.png')
export default {
  data () {
    return {
      logo,
    }
  },
}
</script>

<style lang="scss" scoped>
.module {
  width: 100px;
  margin-right: 40px;
  display: inline-block;
  .img {
    padding: 5px;
    border: 1px solid #eee;
    img {
      width: 100%;
    }
  }
  .module-title {
    width: 100%;
    padding-top: 10px;
    text-align: center;
  }
}
</style>
