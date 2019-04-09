<template>
  <el-input type="textarea" :autosize="autosize" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
  </el-input>
</template>
<script>
export default {
  name: 'IepInputArea',
  inheritAttrs: false,
  props: {
    autosize: {
      type: Object,
      default: () => {
        return {
          minRows: 4,
        }
      },
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
  },
}
</script>
