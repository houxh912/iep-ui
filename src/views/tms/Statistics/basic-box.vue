<template>
  <div class="basic-box">
    <el-card shadow="never">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BasicBox',
}
</script>

<style lang="scss" scoped>
.basic-box {
  padding-bottom: 20px;
}
</style>
