<template>
  <el-button class="link-btn" type="text" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: 'IepTableLink',
}
</script>

<style scoped>
.link-btn {
  color: #999;
}
.link-btn:hover {
  color: #666;
}
</style>
