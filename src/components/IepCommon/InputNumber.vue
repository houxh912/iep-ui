<template>
  <el-input-number controls-position="right" v-bind="$attrs" v-on="$listeners"></el-input-number>
</template>
<script>
export default {
  name: 'IepInputNumber',
  inheritAttrs: false,
}
</script>