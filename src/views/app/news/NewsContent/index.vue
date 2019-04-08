<template>
  <div class="news-content">
    <el-col :span="16">
      <el-card shadow="never">
        <news-left></news-left>
      </el-card>
    </el-col>
    <el-col :span="8">
      <news-right></news-right>
    </el-col>
  </div>
</template>
<script>
import NewsRight from './NewsRight'
import NewsLeft from './NewsLeft'
export default {
  components: { NewsLeft, NewsRight },
}
</script>
<style lang="scss" scoped>
.news-content {
  display: flex;
  justify-content: flex-start;
  .el-card {
    border: 0;
  }
}
</style>
