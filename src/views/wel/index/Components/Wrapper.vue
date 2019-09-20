<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="title">
        {{title}}
        <slot name="left"></slot>
      </div>
      <slot name="right"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 10px 20px;
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
