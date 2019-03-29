<template>
  <el-card shadow="hover">
    <el-row class="custom">
      <el-col class="head">客户分析</el-col>
    </el-row>
    <el-row>
      <el-col :span=10>
        <div class="echarts odd">图表1</div>
      </el-col>
      <el-col :span=9>
        <div class="echarts">图表2</div>
      </el-col>
      <el-col :span=5>
        <div class="echarts lines">
          <div class="line"></div>
          <div class="msg">您的客户中：</div>
          <div class="msg">园区级，平台类客户居多</div>
          <div class="msg">平均拜访次数：<span class="color">3</span></div>
          <div class="msg">平均方案上传：<span class="color">4</span></div>
          <div class="suggest">建议多寻找省级客户，建议多寻找省级客户，建议多寻找省级客户，建议多寻找省级客户。</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.custom {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
}
.echarts {
  height: 300px;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  border: 1px solid #eee;
  .msg {
    padding: 5px 0;
  }
  .suggest {
    margin-top: 20px;
  }
}
.lines {
  padding-left: 20px;
  .line {
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: #eee;
  }
}
</style>
