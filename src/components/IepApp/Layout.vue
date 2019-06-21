<template>
  <div class="app-layout">
    <div>
      <slot></slot>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
export default {
  name: 'IepAppLayout',
}
</script>
<style lang="css" scoped>
.app-layout {
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>


