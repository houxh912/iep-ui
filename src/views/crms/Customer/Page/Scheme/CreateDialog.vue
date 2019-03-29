<template>

  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}方案`" width="60%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="formName" label-width="100px" size="small">
      <el-form-item>
        <el-col><i class="el-icon-warning"></i> 是否需要关联材料库？如需要，<span class="relation">请点击</span></el-col>
        <el-col>如不需要，请直接填写下方内容</el-col>
      </el-form-item>
      <el-form-item label="方案名称：" prop="programName">
        <el-input v-model="formData.programName"></el-input>
      </el-form-item>
      <el-form-item label="附件上传：">
        <el-col class="upload-item">
          <iep-upload v-model="formData.fileList" :limit="1"></iep-upload>
        </el-col>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      submitFn: () => { },
      methodName: '',
      formData: initForm(),
      record: {},
      rules: {
        programName: [
          { required: true, message: '请填写方案名称', trigger: 'change' },
        ],
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
      console.log(this.formData)
      if (this.formData.fileList.length != 0) {
        this.formData.url = this.formData.fileList[0].url
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn({ ...this.formData, clientId: this.record.id }).then(() => {
            if (this.formData.url === '') {
              this.$message.error('请选择上传的文件')
              return false            }
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
    handelclose (res) {
      this.$set(this.formData, 'atchUpload', res.data.fileName)
    },
  },
}
</script>

