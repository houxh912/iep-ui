<template>
  <iep-dialog :dialog-show="dialogShow" title="领导批示" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="主题" prop="subject">
        <el-input v-model="form.subject" :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="收件人">
        <!-- <iep-tag v-model="formData.receiverIds"></iep-tag> -->
        <iep-contact-multiple v-model="form.receiverList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="正文" prop="content">
        <el-input v-model="form.content" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">创建</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, rules } from './options'
import { createEmail } from '@/api/mlms/email/index'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      loadState: false,
      form: initForm(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.dialogShow = false
    },
    // 处理数据
    dealReceiverList () {
      this.form.receiverIds = this.form.receiverList.users.map(m => m.id) // 接收人
      this.form.orgIds = this.form.receiverList.orgs.map(m => m.id) // 组织
      // this.formData.attachmentIds = this.form.attachmentList.map(m => m.id)
    },
    // 发送
    submitForm (formName) {
      this.dealReceiverList()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          createEmail(this.form).then(() => {
            this.$message({
              message: '创建成功',
              type: 'success',
            })
            this.loadState = false
            this.form = initForm()
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