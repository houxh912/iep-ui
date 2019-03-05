<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}组织`" width="50%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="允许加入" prop="isOpen">
        <el-switch v-model="formData.isOpen" :active-value="0" :inactive-value="1"></el-switch>
      </el-form-item>
      <el-form-item label="组织描述" prop="intro">
        <el-input type="textarea" v-model="formData.intro"></el-input>
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
import { initFormData } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules: {},
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
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
            this.resetForm()
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
    },
  },
}
</script>
