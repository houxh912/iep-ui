<template>
  <iep-dialog :dialog-show="dialogShow" title="发送邮件" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-right: 20px;">

      <el-form-item label="主题：" prop="subject">
        <el-input v-model="formData.subject" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="收件人：" prop="receiverList">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <iep-froala-editor v-model="formData.content"></iep-froala-editor>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">发送</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, dictsMap, rules } from './options'
import { createEmail } from '@/api/mlms/email/index'

export default {
  components: {},
  props: {
    type: {
      type: String,
      default: 'summary',
    },
  },
  data () {
    return {
      dictsMap,
      rules,
      dialogShow: false,
      formData: initFormData(),
      loadState: false,
    }
  },
  methods: {
    open (form) {
      this.formData = Object.assign({}, this.formData, form)
      console.log('formData: ', this.formData)
      this.dialogShow = true
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.formData.receiverIds = this.formData.receiverList.users.map(m => m.id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          createEmail(this.formData).then(() => {
            this.$message({
              message: '发送成功',
              type: 'success',
            })
            this.loadState = false
            this.loadPage()
            this.dialogShow = false
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

<style lang="scss" scoped>
.item {
  line-height: 40px;
  i {
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
