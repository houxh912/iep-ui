<template>
  <div class="news-content">
    <el-col :span="16">
      <news-left></news-left>
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
}
</style>
