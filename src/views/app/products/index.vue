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
  margin-top: -60px;
}
</style>
