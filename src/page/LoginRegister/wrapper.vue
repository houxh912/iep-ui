<template>
  <iep-page-layout class="layout-wrapper">
    <top-wrapper>
      <template slot="top-left">
        <top-logo></top-logo>
      </template>
      <template class="top-right" slot="top-right">
        <span class="contact" @click="$openPage('http://wpa.qq.com/msgrd?v=3&amp;uin=390694766&amp;site=qq:390694766&amp;menu=yes', 'url')"><i class="iconfont icon-kefu"></i>在线客服{{kefuName}}</span>
        <el-divider direction="vertical"></el-divider>
        联系电话: <span class="num">0580-2299669</span>
      </template>
    </top-wrapper>
    <div class="bg-container-wrapper">
      <div class="login-img-wrapper">
        <img v-show="currentId === 0" class="animated fadeIn" src="/img/bg/wh1.webp" alt="">
        <img v-show="currentId === 1" class="animated fadeIn" src="/img/bg/wh2.webp" alt="">
        <img v-show="currentId === 2" class="animated fadeIn" src="/img/bg/wh3.webp" alt="">
      </div>
      <div></div>
      <div></div>
    </div>
    <div class="login-container-wrapper">
      <div></div>
      <div></div>
      <div class="user-opt-wrapper animated fadeInRight">
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
      // eslint-disable-next-line
      IS_ICAN,
      currentId: 0,
    }
  },
  computed: {
    kefuName () {
      if (this.IS_ICAN) {
        return '小能'
      } else {
        return '小脉'
      }
    },
  },
  mounted () {
    this.animationInterval = setInterval(() => {
      if (this.currentId === 2) {
        this.currentId = 0
      } else {
        this.currentId++
      }
    }, 20000)
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
    margin: 20px 0;
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 1px 2px #eee;
  }
}
.top-right {
  .num {
    margin-left: 5px;
    color: $--menu-color-primary;
    font-weight: 600;
  }
  .contact {
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      margin-right: 5px;
      font-size: 24px;
    }
    &:hover {
      color: $--menu-color-primary;
    }
  }
}
.bg-container-wrapper,
.login-container-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(100vh - 120px);
  .login-img-wrapper {
    margin-left: 30px;
    width: 500px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
