<template>
  <div class="wb-wrapper">
    <wb-content class="wb-content" :style="{marginRight: isShow300px}"></wb-content>
    <wb-aside class="wb-aside" :class="{inactive:!showAside }" @aside-hide="toggleShowAside"></wb-aside>
  </div>
</template>

<script>
import WbAside from './WbAside'
import WbContent from './WbContent'
import displayMixins from '@/mixins/displayMixins'
export default {
  name: 'OrgWb',
  mixins: [displayMixins],
  components: { WbAside, WbContent },
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
.wb-wrapper {
  display: flex;
  position: relative;
  .wb-content {
    box-sizing: border-box;
    transition: 1000 all ease-in;
  }
  .wb-aside {
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
