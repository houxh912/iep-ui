<template>
  <div class="process-schedule">
    <span class="sub-title">{{title}}</span>
    <el-steps :active="2" align-center>
      <el-step title="创建投资"></el-step>
      <el-step title="资产委员会审核"></el-step>
      <el-step title="募集"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '基础信息',
    }
  },
}
</script>
<style lang="css" scoped>
.process-schedule >>> .el-step__icon-inner {
  display: none;
}
</style>


