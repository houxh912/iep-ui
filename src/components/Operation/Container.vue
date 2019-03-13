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
  margin-bottom: 15px;
  & > div > * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  .el-button--default {
    &:hover, &:focus {
      border-color: #bf051a;
      background-color: #fff2f4;
      color: #bf051a;
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
      background-color: #bf051a;
      color: #fff;
    }
  }
  .el-input-group__append, .el-input-group__prepend {
    &:hover {
      color: ccc;
      background-color: #f0f0f0;
    }
  }
}
</style>
<style scoped>
.operation-container > div >>> .el-button + .el-button {
  margin-left: 0;
}
.operation-container >>> .input-wrapper > * {
  padding: 0;
}
.operation-container >>> div:nth-child(1) > .el-button {
  border: 1px solid #bf051a;
  background-color: #f9eae7;
  color: #bf051a;
}
.operation-container >>> div:nth-child(1) > .el-button:hover {
  background-color: #bf051a;
  color: #fff;
}
</style>