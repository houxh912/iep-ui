<template>
  <div class="wel-wrapper">
    <wel-content class="wel-content" :style="{marginRight: isShow300px}"></wel-content>
    <wel-aside class="wel-aside" :class="{inactive:!showAside }" @aside-hide="toggleShowAside"></wel-aside>
  </div>
</template>

<script>
import WelAside from './WelAside/'
import WelContent from './WelContent/'
import displayMixins from '@/mixins/displayMixins'
export default {
  name: 'Wel',
  mixins: [displayMixins],
  components: { WelAside, WelContent },
  data () {
    return {
      showAside: true,
    }
  },
  created () {
    this.showAside = this.isDesktop()
  },
  computed: {
    isShow300px () {
      if (this.isTablet()) {
        return '0'
      }
      return this.showAside ? '300px' : '0'
    },
  },
  methods: {
    toggleShowAside () {
      this.showAside = !this.showAside
    },
  },
}
</script>

<style scoped="scoped" lang="scss">
.wel-wrapper {
  display: flex;
  position: relative;
  .wel-content {
    box-sizing: border-box;
    transition: 1000 all ease-in;
  }
  .wel-aside {
    width: 300px;
    height: 100%;
    position: fixed;
    right: 0;
    z-index: 102;
    transition: left 0.5s cubic-bezier(0.82, 0.085, 0.395, 0.895);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  .inactive {
    right: -300px;
  }
}
</style>
