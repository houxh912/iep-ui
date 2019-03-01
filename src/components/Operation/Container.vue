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
  & > div > * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  .modify {
    &:hover,
    &:focus {
      border-color: #bf051a;
      background-color: #fff2f4;
      color: #bf051a; 
    }
  }
  .examine {
    border-color: #bf051a;
    background-color: #fff2f4;
    color: #bf051a; 
    &:hover,
    &:focus {
      border-color: #fb5966;
      background-color: #fb5966;
      color: #fff;
    }
  }
}
</style>
<style scoped>
.operation-container > div >>> .el-button + .el-button {
  margin-left: 0;
}
</style>