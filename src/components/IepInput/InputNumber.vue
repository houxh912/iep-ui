<template>
  <el-input-number controls-position="right" :min="min" v-bind="$attrs" v-on="$listeners"></el-input-number>
</template>
<script>
export default {
  name: 'IepInputNumber',
  inheritAttrs: false,
  props: {
    min: {
      type: Number,
      default: 0,
    },
  },
}
</script>