<template>
  <el-form class="form-detail" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="password">
      <iep-ant-input v-model="form.password" type="password" autocomplete="new-password" placeholder="请输入密码" iconfont="icon-suoding1"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="cpassword">
      <iep-ant-input v-model="form.cpassword" type="password" autocomplete="new-password" placeholder="确认你的密码" iconfont="icon-suoding1"></iep-ant-input>
    </el-form-item>
    <div>
      <iep-button class="iep-btn-block" type="primary" size="medium" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">完成注册</iep-button>
      <iep-button type="text" @click="$openPage('/login')">已有账号？立即登录</iep-button>
    </div>
  </el-form>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { registerUser } from '@/api/login'
export default {
  mixins: [formMixins],
  data () {

    return {
      form: {
        mobile: '',
        code: '',
        password: '',
        cpassword: '',
      },
      rules: {
        password: [{ required: true, trigger: 'change', message: '请输入短信验证码' }],
      },
      // checked: false,
    }
  },
  methods: {
    async submitForm () {
      const { data } = await registerUser(this.form)
      if (data.data) {
        this.$message.success('恭喜你，注册成功')
        const data = await this.$store.dispatch('LoginByPhone', {
          mobile: this.form.phone,
          code: this.form.code,
        })
        if (data.access_token) {
          this.$emit('onredirect')
        } else {
          this.$message(data.msg)
        }
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.form-detail {
  width: 100%;
}
</style>
