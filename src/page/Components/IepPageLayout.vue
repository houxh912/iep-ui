<template>
  <div class="app-layout">
    <slot></slot>
    <iep-page-footer-bar></iep-page-footer-bar>
  </div>
</template>
<script>
import IepPageFooterBar from './IepPageFooterBar'
export default {
  name: 'IepPageLayout',
  components: { IepPageFooterBar },
}
</script>
<style lang="css" scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  background: url("/img/bg/bg-login.webp") no-repeat;
  background-size: cover;
  flex-direction: column;
}
</style>


