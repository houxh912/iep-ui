<template>
  <el-card class="studyExponent-box" shadow="never">
    <div slot="header" class="clearfix">
      <span>学习指数</span>
    </div>
    <el-row>
      <el-col :span="8" class="tab">
        <p><label class="tabTxt">考&emsp;试</label><label class="tabNum">28</label><label class="tabUnit">场</label></p>
        <p><label class="tabTxt">及格率</label><label class="tabNum">82</label><label class="tabUnit">%</label></p>
      </el-col>
      <el-col :span="8" class="tab">
        <p><label class="tabTxt">练&emsp;习</label><label class="tabNum">28</label><label class="tabUnit">次</label></p>
        <p><label class="tabTxt">正确率</label><label class="tabNum">82</label><label class="tabUnit">%</label></p>
      </el-col>
      <el-col :span="8" class="tab">
        <p><label class="tabTxt">试&emsp;题</label><label class="tabNum">28</label><label class="tabUnit">道</label></p>
        <p><label class="tabTxt">通过率</label><label class="tabNum">82</label><label class="tabUnit">%</label></p>
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
.studyExponent-box {
  .el-row {
    .el-col {
      border-right: 1px solid #ddd;
      &:last-child {
        border: 0;
      }
    }
  }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #666;
    .tabTxt {
      color: rgb(136, 136, 136);
      font-size: 16px;
      padding: 0 18px;
    }
    .tabUnit {
      color: rgb(136, 136, 136);
      font-size: 16px;
      padding: 0 10px;
    }
    .tabNum {
      font-size: 26px;
      font-weight: 600;
    }
  }
}
</style>

