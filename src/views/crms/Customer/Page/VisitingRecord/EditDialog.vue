<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}组织`" width="40%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="formName" size="small" label-width="100px">
      <el-form-item label="主题：" prop="theme">
        <el-input v-model="formData.theme"></el-input>
      </el-form-item>
      <el-form-item label="拜访时间：" prop="visitTime">
        <iep-date-picker v-model="formData.visitTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="拜访记录：" prop="contactRecord">
        <el-input type="textarea" v-model="formData.contactRecord"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
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
      submitFn: () => { },
      methodName: '创建',
      formData: {},
      record: {},
      id: '',
      rules: {
        theme: [
          { required: true, message: '请输入主题', trigger: 'change' },
        ],
        visitTime: [
          { required: true, message: '请选择时间', trigger: 'change' },
        ],
        contactRecord: [{ required: true, message: '请填写拜访记录', trigger: 'change' }],
      },
    }
  },
  methods: {
    loadPage () {
      this.formData = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.formData.clientId = this.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn({ ...this.formData }).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.dialogShow = false
            this.$emit('load-page')
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style>
.btn {
  margin-right: 10px;
}
</style>

