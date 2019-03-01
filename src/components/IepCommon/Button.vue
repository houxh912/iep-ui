<template>
  <el-button :size="size" :plain="plain" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: 'IepButton',
  props: {
    size: {
      type: String,
      default: 'small',
    },
    plain: {
      type: Boolean,
      default: true,
    },
  },
  inheritAttrs: false,
}
</script>
