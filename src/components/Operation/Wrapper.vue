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
/* .operation-wrapper .el-button.el-button--default:nth-child(1) {
  border-color: #ea8d03;
  background-color: #fff7ec;
  color: #ea8d03;
} */
/* .operation-wrapper .el-button:nth-child(1):hover {
	background-color: #ea8d03;
	color: #fff;
} */
.operation-wrapper .el-button.is-disabled.is-plain,
.operation-wrapper .el-button.is-disabled.is-plain:focus,
.operation-wrapper .el-button.is-disabled.is-plain:hover {
  background-color: #fff;
  border-color: #ebeef5;
  color: #c0c4cc;
}
</style>
