<template>
  <div class="basic-container" :class="{ 'basic-container--block': block }">
    <el-card>
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
  .el-card {
    width: 100%;
    border: 0;
    border-radius: 0;
    box-shadow: none;
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
.basic-container >>> .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.basic-container >>> .el-card.is-hover-shadow:hover {
  box-shadow: none;
}

.basic-container >>> .el-card .el-input.is-active .el-input__inner,
.basic-container >>> .el-card .el-input__inner:focus,
.basic-container >>> .el-textarea__inner,
.basic-container >>> .el-textarea__inner:focus {
  border-color: #c0c4cc;
}
</style>