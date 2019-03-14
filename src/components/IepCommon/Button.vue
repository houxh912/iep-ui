<template>
  <el-button :size="size" :plain="plain" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: 'IepButton',
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: 'small',
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.el-button {
  &:hover {
    // border-color: #bf051a;
    background-color: #fff2f4;
    color: #bf051a;
  }
}

.el-button--primary {
  border-color: #bf051a;
  background-color: #bf051a;
  color: #fff;
  &:hover {
    border-color: #fb5966;
    background-color: #fb5966;
    color: #fff;
  }
}
</style>