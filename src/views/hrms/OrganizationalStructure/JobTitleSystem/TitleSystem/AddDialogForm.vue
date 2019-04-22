<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}职称`" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="职务名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="职务说明" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="intro">
        <iep-input-number v-model="form.priority"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initForm } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入职务名称', trigger: 'change' },
        ],
        description: [
          { required: true, message: '请填写职务描述', trigger: 'change' },
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
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
