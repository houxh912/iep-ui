<template>
  <div class="top">
    <div class="top-left">
      <slot name="top-left"></slot>
    </div>
    <div class="top-center">
      <slot name="top-center"></slot>
    </div>
    <div class="top-right">
      <slot name="top-right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopWrapper',
}
</script>

<style lang="scss" scoped>
.top {
  z-index: 10;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: rgba(0, 0, 0, 0.65);
  height: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .top-left {
    display: flex;
    margin-left: 20px;
  }
  .top-right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
