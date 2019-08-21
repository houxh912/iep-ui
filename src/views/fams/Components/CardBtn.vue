<template>
  <div class="card-btn-grid">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'IepCardBtn',
}
</script>
<style lang="scss" scoped>
.card-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  & > div {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    border: 1px solid #eee;
    color: #666;
    &:hover {
      border: 1px solid $--color-primary;
      color: $--color-primary;
    }
  }
}
</style>



