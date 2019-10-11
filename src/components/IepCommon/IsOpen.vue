<template>
  <el-form-item label="开放范围：" prop="isOpen">
    <el-radio-group v-model="form.isOpen">
      <el-radio :label="3">对联盟开放</el-radio>
      <el-radio :label="2">对组织开放</el-radio>
      <el-radio :label="0">生态开放</el-radio>
      <el-radio :label="1">关闭</el-radio>
    </el-radio-group>
  </el-form-item>
</template>
<script>
export default {
  name: 'IepIsOpen',
  props: ['value'],
  computed: {
    form: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
