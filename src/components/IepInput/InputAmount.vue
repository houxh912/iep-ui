<template>
  <el-input-number class="iep-input-number-wrapper" :precision="precision" :min="min" :max="max" :controls="false" v-bind="$attrs" v-on="$listeners"></el-input-number>
</template>
<script>
export default {
  name: 'IepInputAmount', // iep-input-amount
  inheritAttrs: false,
  props: {
    precision: {
      type: Number,
      default: 2,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999999999,
    },
  },
}
</script>

<style lang="scss" scoped>
.iep-input-number-wrapper ::v-deep .el-input__inner {
  text-align: left;
}
</style>
