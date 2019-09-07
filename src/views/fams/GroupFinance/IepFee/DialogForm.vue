<template>
  <iep-dialog :dialog-show="dialogShow" :title="methodName" width="500px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="收款日期：" prop="dateOfCollection">
        <iep-date-picker v-model="form.dateOfCollection" type="month"></iep-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dtoForm, rules } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '收取内网使用费',
      form: initForm(),
      rules,
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(dtoForm(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
            } else {
              this.$message(data.msg)
            }
            this.close()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

