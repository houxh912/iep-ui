<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}组织`" width="50%" @close="loadPage">
    <el-form :model="orgForm" :rules="rules" ref="orgForm" label-width="100px">
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="orgForm.name"></el-input>
      </el-form-item>
      <el-form-item label="允许加入" prop="isOpen">
        <el-switch v-model="orgForm.isOpen" :active-value="0" :inactive-value="1"></el-switch>
      </el-form-item>
      <el-form-item label="组织描述" prop="intro">
        <el-input type="textarea" v-model="orgForm.intro"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('orgForm')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('orgForm')">初始值</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initOrgForm } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      orgForm: initOrgForm(),
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        isOpen: [],
        intro: [
          { required: true, message: '请填写组织描述', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.orgForm = initOrgForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.orgForm).then(() => {
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
