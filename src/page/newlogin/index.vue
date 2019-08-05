<template>
  <iep-page-layout>
    <top-wrapper>
      <template slot="top-left">
        <top-logo></top-logo>
      </template>
      <template slot="top-right">
      </template>
    </top-wrapper>
    <div class="login-container-wrapper">
      <div class="login-img-wrapper">
        <img v-show="currentId === 0" class="animated fadeInUp" src="/img/bg/wh1.png" alt="">
        <img v-show="currentId === 1" class="animated fadeInUp" src="/img/bg/wh2.png" alt="">
        <img v-show="currentId === 2" class="animated fadeInUp" src="/img/bg/wh3.png" alt="">
      </div>
    </div>
  </iep-page-layout>
</template>
<script>
import TopWrapper from '@/page/Components/TopWrapper'
import TopLogo from '@/page/Components/TopLogo'
import IepPageLayout from '@/page/Components/IepPageLayout'
export default {
  components: {
    TopWrapper,
    TopLogo,
    IepPageLayout,
  },
  data () {
    return {
      currentId: 0,
    }
  },
  mounted () {
    this.animationInterval = setInterval(() => {
      if (this.currentId === 2) {
        this.currentId = 0
      } else {
        this.currentId++
      }
    }, 5000)
  },
  destroyed () {
    clearInterval(this.animationInterval)
  },
}
</script>
<style lang="scss" scoped>
.login-container-wrapper {
  display: flex;
  align-items: center;
  .login-img-wrapper {
    // position: absolute;
  }
}
</style>
