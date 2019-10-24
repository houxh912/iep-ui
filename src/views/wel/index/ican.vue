<template>
  <div class="ican-wrapper">
    <ican-content class="ican-content"></ican-content>
    <ican-aside class="ican-aside"></ican-aside>
  </div>
</template>
<script>
import IcanAside from './IcanAside/index'
import IcanContent from './IcanContent/index'
export default {
  components: {
    IcanContent,
    IcanAside,
  },
}
</script>
<style lang="scss" scoped>
.ican-wrapper {
  display: flex;
  .ican-content {
    width: calc(100% - 280px);
  }
  .ican-aside {
    width: 280px;
  }
}
</style>
