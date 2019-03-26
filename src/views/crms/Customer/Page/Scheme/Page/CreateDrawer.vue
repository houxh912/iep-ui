<template>

  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="methodName+'联系人'" width="50%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
      <el-form-item>
        <el-col><i class="el-icon-warning"></i> 是否需要关联材料库？如需要，<span class="relation">请点击</span></el-col>
        <el-col>如不需要，请直接填写下方内容</el-col>
      </el-form-item>
      <el-form-item label="方案名称：" prop="programName">
        <el-input v-model="formData.programName"></el-input>
      </el-form-item>
      <el-form-item label="附件上传：" prop="downLoadUrl">
        <el-col class="upload-item">
          <el-input class="upload-input" v-model="formData.downLoadUrl" :disabled="true" />
          <iep-button class="upload-button" size="small" plain><i class="el-icon-plus"></i> 点击上传</iep-button>
        </el-col>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-drawer>
</template>
<script>
import { initContactForm } from '../options'
export default {
  data () {
    return {
      drawerShow: false,
      submitFn: () => { },
      methodName: '创建',
      formData: {},
      record: {},
      rules: {
        theme: [
          { required: true, message: '请输入主题', trigger: 'change' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' },
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
      this.formData = initContactForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initContactForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn({ ...this.formData, clientId: this.record.clientId }).then(() => {
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
  },
}
</script>
<style>
.btn {
  margin-right: 10px;
}
</style>

