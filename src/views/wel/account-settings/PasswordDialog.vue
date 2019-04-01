<template>
  <iep-dialog :dialog-show="dialogShow" title="修改密码" width="520px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newpassword1">
        <el-input type="password" v-model="form.newpassword1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newpassword2">
        <el-input type="password" v-model="form.newpassword2" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { initPasswordForm } from './options'
import request from '@/router/axios'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initPasswordForm(),
      rules: {
        departureTime: [
          { required: true, message: '请选择离职时间', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请输入离职原因', trigger: 'blur' },
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
    ...mapActions(['GetUserInfo']),
    loadPage () {
      this.form = initPasswordForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: '/admin/user/edit',
            method: 'put',
            data: this.form,
          })
            .then(response => {
              if (response.data.data) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000,
                })
                this.GetUserInfo()
                // 修改密码之后强制重新登录
                if (this.switchStatus === 'passwordManager') {
                  this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                }
              } else {
                this.$notify({
                  title: '失败',
                  message: response.data.msg,
                  type: 'error',
                  duration: 2000,
                })
              }
            })
            .catch(() => {
              this.$notify({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000,
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

