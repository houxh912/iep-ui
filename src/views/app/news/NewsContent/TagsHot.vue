<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">热门标签</span>
    </div>
    <el-tag v-for="o in 10" :key="o" class="text item">
      {{'标签内容 ' + o }}
    </el-tag>
  </el-card>
</template>
<style lang="css" scoped>
.el-card {
  border: 0;
}
.el-card >>> .el-card__header {
  padding-top: 0;
}
.el-card >>> .el-card__body {
  padding: 20px 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-right: 15px;
  margin-bottom: 18px;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>