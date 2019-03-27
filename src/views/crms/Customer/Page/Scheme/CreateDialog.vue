<template>

  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}方案`" width="60%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="formName" label-width="100px">
      <el-form-item>
        <el-col><i class="el-icon-warning"></i> 是否需要关联材料库？如需要，<span class="relation">请点击</span></el-col>
        <el-col>如不需要，请直接填写下方内容</el-col>
      </el-form-item>
      <el-form-item label="方案名称：" prop="programName">
        <el-input v-model="formData.programName"></el-input>
      </el-form-item>
      <el-form-item label="附件上传：" prop="atchUpload">
        <el-col class="upload-item">
          <el-input class="upload-input" v-model="formData.atchUpload" :disabled="true" />
          <iep-button class="upload-button" size="small" plain @click.native="handleUpload"><i class="el-icon-plus"></i> 点击上传</iep-button>
        </el-col>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
    <upload-dialog ref="UploadDialog" :urlName="url" @close="handelclose"></upload-dialog>
  </iep-dialog>
</template>
<script>
import { initSchemeForm } from './options'
import UploadDialog from './UploadDialog'
export default {
  components: { UploadDialog },
  data () {
    return {
      dialogShow: false,
      submitFn: () => { },
      methodName: '',
      formData: {},
      record: {},
      rules: {
        programName: [
          { required: true, message: '请填写方案名称', trigger: 'change' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' },
        ],
        atchUpload: [
          { required: true, message: '请上传附件', trigger: 'change' },
        ],
      },
      url: '/api/admin/file/upload',
    }
  },
  methods: {
    loadPage () {
      this.formData = initSchemeForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initSchemeForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn({ ...this.formData, clientId: this.record.id }).then(() => {
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
    handleUpload () {
      this.$refs['UploadDialog'].dialogShow = true
    },
    handelclose (res) {
      this.$set(this.formData, 'atchUpload', res.data.fileName)
    },
  },
}
</script>

