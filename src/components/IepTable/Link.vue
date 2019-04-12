<template>
  <el-button class="link-btn" :class="{'link-is-read':isRead}" type="text" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: 'IepTableLink',
  props: {
    isRead: {
      type: Number,
      default: 1,
    },
  },
}
</script>
<style scoped>
.link-btn {
  padding: 5px 0;
}
</style>

<style lang="scss" scoped>
.link-btn {
  color: #606266;
  &:hover {
    color: #999;
  }
}
.link-is-read {
  color: #999;
  &:hover {
    color: #666;
  }
}
</style>
