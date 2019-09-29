<template>
  <div class="logo-wrapper">
    <div class="logo" @click="$openPage('//www.icanvip.net/', 'url')"></div>
    <div>智慧组织赋能平台</div>
    <!-- <a-dropdown>
      <a>
        国脉智慧平台
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item v-for="(v, i) in collectWebsite" :key="i" @click="$openPage(v.url, 'url')">
          {{v.name}}
        </a-menu-item>
      </a-menu>
    </a-dropdown> -->
  </div>
</template>

<script>
import website from '@/const/website'
export default {
  name: 'TopLogo',
  data () {
    return {
      collectWebsite: website.collectWebsite,
    }
  },
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  margin: 13px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  .logo {
    cursor: pointer;
    margin-right: 10px;
    width: 50px;
    height: 50px;
    background-image: url("/img/logo-.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
