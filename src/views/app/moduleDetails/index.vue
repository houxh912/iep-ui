<template>
  <div class="module-details">
    <introduction></introduction>
    <el-tabs v-model="activeName" class="tab">
      <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
      <el-tab-pane label="团队信息" name="second">团队信息</el-tab-pane>
      <el-tab-pane label="全部版本" name="third">全部版本</el-tab-pane>
      <el-tab-pane label="应用产品" name="fourth">应用产品</el-tab-pane>
      <el-tab-pane label="技术应用" name="fifth">技术应用</el-tab-pane>
      <el-tab-pane label="相关材料" name="sixth">相关材料</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Introduction from './Introduction'
export default {
  components:{ Introduction },
  data () {
    return {
      activeName: 'first',
    }
  },
}
</script>
<style lang="scss" scoped>
.module-details {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  .tab{
    height: 80px;
    line-height: 80px;
    font-size: 18px;
  }
}
</style>
<style scoped>
</style>

