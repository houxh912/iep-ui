<template>
  <div class="wel-wrapper">
    <information :class="{welContent: true, mini: isShow}" />
    <about-me class="wel-aside" @on-show="isShow = !isShow"></about-me>
  </div>
</template>

<script>
import aboutMe from './wel-aside/'
import information from './wel-content/'

export default {
  name: 'Wel',
  components: { aboutMe, information },
  data () {
    return {
      isShow: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.mini {
  width: calc(100% - 300px);
}
.large {
  width: 100%;
}
.wel-wrapper {
  display: flex;
  position: relative;
  .show {
    position: fixed;
    display: inline-block;
    width: auto;
    height: 30px;
    color: #bfbfbf;
    background: #fafafa;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    top: 70px;
    right: 10px;
    z-index: 101;
    i {
      transform: rotate(180deg);
    }
  }
  .wel-content {
    box-sizing: border-box;
  }
  .wel-aside {
    position: fixed;
    right: 0;
    z-index: 102;
  }
}
@media (min-width: 1024px) and (max-width: 1199px) {
  .wel-wrapper {
    .wel-content {
      margin-right: 0;
      width: 100%;
    }
    .wel-aside {
      right: 0;
    }
  }
}
@media (min-width: 0px) and (max-width: 1138px) {
  .wel-wrapper {
    .wel-content {
      margin-right: 0;
      width: 100%;
    }
    .wel-aside {
      right: -300px;
    }
  }
}
@media (min-width: 0px) and (max-width: 1023px) {
  .wel-wrapper {
    .show {
      display: none;
    }
    .wel-content {
      width: 100%;
      margin-right: 0;
    }
    .wel-aside {
      right: -300px;
    }
  }
}
</style>
