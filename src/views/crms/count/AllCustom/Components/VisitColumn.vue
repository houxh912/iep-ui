<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">拜访情况</span>
    </div>
    <div>
      <el-row>
        <el-col :span=12>
          <div class="top">
            <span>拜访数量</span>
          </div>
          <div class="echarts odd">图表1</div>
        </el-col>
        <el-col :span=12>
          <div class="top">客户出单拜访记录</div>
          <div class="echarts">图表2</div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.clearfix {
  .title {
    font-weight: 700;
    font-size: 18px;
  }
}
.top {
  padding: 10px;
}
.echarts {
  height: 100px;
  padding: 15px 10px;
  border: 1px solid #eee;
}
.odd {
  margin-right: 20px;
}
</style>
