<template>
  <div class="operation-wrapper">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.operation-wrapper > * {
  margin-right: 5px;
  margin-bottom: 5px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
<style scoped>
.operation-wrapper >>> .el-button + .el-button {
  margin-left: 0;
}
</style>
