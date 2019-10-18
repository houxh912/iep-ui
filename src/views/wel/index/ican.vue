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
    flex: 3;
    width: 75%;
  }
  .ican-aside {
    width: 25%;
    flex: 1;
    display: inline-table;
  }
}
</style>
