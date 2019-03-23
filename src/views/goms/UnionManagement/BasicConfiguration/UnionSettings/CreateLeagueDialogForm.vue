<template>
  <iep-dialog :dialog-show="dialogShow" title="创建联盟" width="60%" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="联盟名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入联盟名称"></el-input>
      </el-form-item>
      <el-form-item label="Logo" prop="logo">
        <iep-avatar v-model="form.logo"></iep-avatar>
      </el-form-item>
      <el-form-item label="联盟简介" prop="intro">
        <el-input v-model="form.intro" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
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
      form: initOrgForm(),
      rules: {
        name: [
          { required: true, message: '请输入联盟名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initOrgForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$notify({
              title: '成功',
              message: '创建成功',
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
  },
}
</script>

