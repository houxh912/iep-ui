<template>
  <iep-dialog :dialog-show="dialogShow" title="新增发行" width="400px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="金额：" prop="amount">
        <iep-input-number v-model="form.amount"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
function initForm () {
  return {
    amount: 0,
  }
}
export default {
  data () {
    return {
      dialogShow: false,
      form: initForm(),
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.form = initForm()
    },
    submitForm () {

    },
  },
}
</script>
