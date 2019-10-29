<template>
  <div class="main-layout">
    <div class="main-container">
      <div class="main-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GovLayoutMain',
}
</script>

<style lang="scss" scoped>
.main-layout {
  padding: 0 20px;
  .main-container {
    border-radius: 6px;
    margin: 0 -20px;
    background-color: #eee;
  }
  .main-wrapper {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
  }
}
</style>
