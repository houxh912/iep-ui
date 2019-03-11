<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}组织`" width="50%" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="职务名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="职务说明" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="intro">
        <el-input-number v-model="form.priority"></el-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">初始值</iep-button>
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
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' },
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
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
