<template>
  <iep-dialog :dialog-show="dialogShow" title="添加管理员" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="管理员" prop="userId">
        <iep-select prefix-url="admin/org/no_admin_user" filterable v-model="form.userId"></iep-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
      rules: {
        userId: [
          { required: true, message: '请选择管理员', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form.userId).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '添加成功',
                type: 'success',
              })
            } else {
              this.$message({
                message: data.msg,
                type: 'error',
              })
            }
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

