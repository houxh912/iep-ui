<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="50%" @close="close">
    <el-form label-width="120px" :model="formData" :ref="'ValidateForm'" :rules="rules">
      <el-form-item label="组织:" prop="companyName">
        <el-input v-model="formData.companyName"></el-input>
      </el-form-item>
      <el-form-item label="职位:" prop="position">
        <el-input v-model="formData.position"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="phoneNumber">
        <el-input v-model="formData.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱:" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="note">
        <el-input v-model="formData.note"></el-input>
      </el-form-item>
      <div class="button">
        <iep-button type="primary" @click="submitForm('ValidateForm')">{{title}}</iep-button>
      </div>
    </el-form>
  </iep-dialog>
</template>
<script>
import { rules, initForm } from './option'
import { postMeetingsignup, putMeetingsignup } from '@/api/mcms/meeting'
export default {
  data () {
    return {
      dialogShow: false,
      formData: initForm(),
      rules,
      id: '',
      title: '',
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.formData = initForm()
      this.$emit('load-page')

    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title == '新增') {
            let form = {
              list: [this.formData],
              mid: this.id,
              number: 1,
            }
            postMeetingsignup(form).then((res) => {
              this.$message({
                message: res.data.msg,
                type: 'success',
              })
            })
            this.close()
          }
          if (this.title == '修改') {
            putMeetingsignup(this.formData).then((res) => {
              this.$message({
                message: res.data.msg,
                type: 'success',
              })
            })
            this.close()
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style scoped>
.button {
  display: flex;
  justify-content: flex-end;
}
</style>
