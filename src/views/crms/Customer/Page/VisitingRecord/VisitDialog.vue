<template>
  <iep-dialog :dialog-show="dialogShow" title="拜访日志" width="40%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-bottom: 50px;">
      <el-form-item :label="`${formData.type == 0 ? '会议主题':'会议标题'}：`" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="会议时间" prop="meetingTime">
        <IepDatePicker v-model="formData.meetingTime"></IepDatePicker>
      </el-form-item>
      <el-form-item label="会议内容：" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent" rows=5></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, dictsMap, rules } from './options'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules,
      id: '',
      clientList: [],
    }
  },
  created () {

  },
  methods: {
    loadPage () {
      this.formData = initFormData()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (form) {
      this.formData.visitingUserId = [this.id]
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.dialogShow = false
            this.$emit('load-page')
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
      this.loadPage('load-page')
    },
  },
}
</script>
