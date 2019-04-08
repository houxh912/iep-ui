<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">热门标签</span>
    </div>
    <el-tag v-for="o in 10" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </el-tag>
  </el-card>
</template>
<style lang="scss" scoped>
.el-card {
  border: 0;
  &:nth-child(1) {
    padding-top: 10px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-right: 15px;
  margin-bottom: 18px;
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