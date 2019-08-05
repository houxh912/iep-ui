<template>
  <iep-page-layout class="layout-wrapper">
    <top-wrapper>
      <template slot="top-left">
        <top-logo></top-logo>
      </template>
      <template slot="top-right">
      </template>
    </top-wrapper>
    <div class="bg-container-wrapper">
      <div class="login-img-wrapper">
        <img v-show="currentId === 0" class="animated fadeInUp" src="/img/bg/wh1.png" alt="">
        <img v-show="currentId === 1" class="animated fadeInUp" src="/img/bg/wh2.png" alt="">
        <img v-show="currentId === 2" class="animated fadeInUp" src="/img/bg/wh3.png" alt="">
      </div>
      <div></div>
    </div>
    <div class="login-container-wrapper">
      <div></div>
      <div class="user-opt-wrapper">
        <slot></slot>
      </div>
    </div>
  </iep-page-layout>
</template>
<script>
import TopWrapper from '@/page/Components/TopWrapper'
import TopLogo from '@/page/Components/TopLogo'
import IepPageLayout from '@/page/Components/IepPageLayout'
export default {
  name: 'UserOperationLayout',
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
.layout-wrapper {
  position: relative;
}
.login-container-wrapper {
  position: absolute;
  width: 100vw;
  top: 60px;
  .user-opt-wrapper {
    width: 400px;
    background-color: #fff;
    padding: 20px;
  }
}
.bg-container-wrapper,
.login-container-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(100vh - 120px);
  // .login-img-wrapper {
  // position: absolute;
  // }
}
</style>
