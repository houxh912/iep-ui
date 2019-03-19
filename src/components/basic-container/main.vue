<template>
  <div class="basic-container" :class="{ 'basic-container--block': block }">
    <el-card shadow="never">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BasicContainer',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.basic-container {
  border-radius: 10px;
  box-sizing: border-box;
  > .el-card {
    border: 0;
    border-radius: 0;
  }
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
}
</style>
<style lang="css" scoped>
.basic-container > .el-card .el-input.is-active .el-input__inner,
.basic-container > .el-card .el-input__inner:focus,
.basic-container > .el-textarea__inner,
.basic-container > .el-textarea__inner:focus {
  border-color: #c0c4cc;
}
</style>