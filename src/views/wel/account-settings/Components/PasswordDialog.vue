<template>
  <iep-dialog :dialog-show="dialogShow" title="修改密码" width="520px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="原密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </iep-form-item>
      <iep-form-item label-name="新密码" prop="newPassword1">
        <el-input type="password" v-model="form.newPassword1" auto-complete="off"></el-input>
      </iep-form-item>
      <iep-form-item label-name="确认密码" prop="newPassword2">
        <el-input type="password" v-model="form.newPassword2" auto-complete="off"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { initForm } from '../options'
import request from '@/router/axios'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        newPassword1: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        newPassword2: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  methods: {
    ...mapActions(['LogOut']),
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      const newForm = this.$mergeByFirst(initForm(this.userInfo.username), { ...this.form })
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: '/admin/user/edit',
            method: 'put',
            data: newForm,
          })
            .then(async (response) => {
              if (response.data.data) {
                this.$message({
                  message: '密码设置成功，请重新登陆',
                  type: 'success',
                })
                // 修改密码之后强制重新登录
                await this.LogOut()
                this.$eventBus.$emit('logout')
                this.$router.push({ path: '/login' })
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error',
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '修改失败',
                type: 'error',
              })
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

