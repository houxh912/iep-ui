<template>
  <img :src="fackerImg" />
</template>
<script>
const fackerImg = require('./facker.png')
export default {
  data () {
    return {
      fackerImg,
    }
  },
}
</script>
<style scoped>
img {
  margin: 0 auto;
  margin-top: -60px;
  width: 1280px;
  display: block;
}
</style>
