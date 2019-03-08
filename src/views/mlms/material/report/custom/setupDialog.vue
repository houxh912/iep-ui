<template>
  <iep-dialog :dialog-show="dialogShow" title="工作表设置" width="40%" @close="resetForm('form')">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="工作表名称：" prop="mingchen">
        <el-input v-model="formData.mingchen"></el-input>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, rules } from './option'
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      dicData: {
        select: [
          {value: 1, label: '选项1'},
          {value: 2, label: '选项2'},
        ],
        dept: [
          {value: 1, label: '部门1'},
          {value: 2, label: '部门2'},
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
