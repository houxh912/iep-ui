<template>
  <div class="iep-page-form">
    <basic-container>
      <el-form ref="form" :model="form" size="small" label-width="120px">
        <el-checkbox v-model="checked">备选项</el-checkbox>
        <el-radio-group v-model="radio">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: '',
      radio: '',
    }
  },
}
</script>
