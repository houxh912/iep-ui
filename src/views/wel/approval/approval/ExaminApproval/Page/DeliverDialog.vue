<template>
  <iep-dialog :dialog-show="dialogShow" title="转交" width="400px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="80px">
      <el-form-item label="转交人" prop="departureTime">
        <iep-contact-select v-model="form.user">
        </iep-contact-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initDeliverForm, toDeliverForm } from '../options'
export default {
  data () {
    return {
      id: null,
      dialogShow: false,
      formRequestFn: () => { },
      form: initDeliverForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initDeliverForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(toDeliverForm(this.form)).then(() => {
            this.$notify({
              title: '成功',
              message: '离职成功',
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

