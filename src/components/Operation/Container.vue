<template>
  <div class="operation-container">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.operation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
  & > div * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
