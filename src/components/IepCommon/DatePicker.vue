<template>
  <el-date-picker :valueFormat="valueFormat" v-bind="$attrs" v-on="$listeners">
  </el-date-picker>
</template>
<script>
export default {
  name: 'IepDatePicker',
  inheritAttrs: false,
  data () {
    return {
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    }
  },
}
</script>
