<template>
  <el-popover placement="bottom" width="200" trigger="click">
    <qrcode value="//iep.govmade.com" :options="{width:170,margin:1}"></qrcode>
    <el-tooltip slot="reference" effect="dark" content="手机版二维码" placement="bottom">
      <iep-button>
        <a-icon type="scan" />
      </iep-button>
    </el-tooltip>
  </el-popover>
</template>
<style lang="scss" scoped>
button {
  border: 0;
  height: 60px;
  i {
    font-size: 20px;
  }
  &:focus,
  &:hover {
    background-color: #eee;
    color: #333;
  }
}
</style>
