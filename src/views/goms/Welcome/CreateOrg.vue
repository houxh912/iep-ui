<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form ref="form" :rules="rules" size="small" :model="form" label-width="120px">
        <iep-form-item label-name="组织名称" prop="name">
          <el-input v-model="form.name" :maxlength="110"></el-input>
        </iep-form-item>
        <iep-form-item label-name="组织类别" prop="orgType">
          <iep-dict-select v-model="form.orgType" dict-name="GOMS_ORG_TYPE"></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="组织Logo" prop="logo">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </iep-form-item>
        <iep-form-item label-name="组织简介" prop="intro">
          <iep-input-area v-model="form.intro"></iep-input-area>
        </iep-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>

</template>

<script>
import { initForm } from './options'
import { addiCanObj, validOrgName } from '@/api/goms/org'
export default {
  data () {
    const validateOrgName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('组织名不能为空'))
      } else {
        validOrgName(value).then(({ data }) => {
          if (!data.data) {
            callback(new Error('该组织名已存在。'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      form: initForm(),
      rules: {
        name: [
          { required: true, validator: validateOrgName, trigger: 'blur' },
          { min: 3, max: 100, message: '组织名称必须超过 3 个字符，但不得超过 100 个字符', trigger: 'blur' },
        ],
        orgType: [
          { required: true, message: '请选择类别', trigger: 'blur' },
        ],
        logo: [
          { required: true, message: '请输入LOGO', trigger: 'blur' },
        ],
        intro: [
          { required: true, message: '请输入组织简介', trigger: 'blur' },
          { min: 3, max: 2000, message: '组织简介必须超过 3 个字符，但不得超过 2000 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addiCanObj(this.form).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '创建成功，等待审核',
                type: 'success',
              })
              this.tabsActive = 0
              this.form = initForm()
              // this.$openPage('/wel/finishorg')
            } else {
              this.$message({
                message: data.msg,
                type: 'warning',
              })
            }
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.create-org-container {
  padding: 0 20px;
  text-align: left;
}
</style>