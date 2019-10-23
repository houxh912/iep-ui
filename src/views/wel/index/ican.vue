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
    flex: 1;
    width: 100%;
  }
  .ican-aside {
    width: 280px;
    flex: 0 0 280px;
    display: inline-table;
  }
}
</style>
