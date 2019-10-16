<template>
  <el-form class="form-detail login-form" :rules="rules" ref="form" :model="form">
    <el-form-item prop="username">
      <iep-ant-input v-model="form.username" autocomplete="username" placeholder="请输入用户名" iconfont="icon-denglu"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="password">
      <iep-ant-input v-model="form.password" type="password" autocomplete="current-password" placeholder="请输入密码" iconfont="icon-suoding1"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="code">
      <iep-ant-input input-type="right-code" :maxlength="code.len" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" :refreshCode="refreshCode" :codeSrc="code.src" @keyup.enter.native="mixinsSubmitFormGen()"></iep-ant-input>
    </el-form-item>
    <el-form-item>
      <div class="login-text">
        将保持登陆状态
        <div class="check-text">
          <el-button type="text" @click="handleRetrieve">忘记密码?</el-button>
          <el-button type="text" @click="handleRegister">立即注册</el-button>
          <el-button v-if="IS_ICAN" type="text" icon="el-icon-chat-dot-square" @click="$openPage('http://wpa.qq.com/msgrd?v=3&amp;uin=390694766&amp;site=qq:390694766&amp;menu=yes', 'url')">联系客服</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <iep-button class="iep-btn-block" type="primary" size="medium " :loading="submitFormLoading" @click="mixinsSubmitFormGen()">登 录</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { mapActions } from 'vuex'
import { randomLenNum } from '@/util/util'
import { codeUrl } from '@/config/env'
export default {
  mixins: [formMixins],
  data () {
    return {
      // eslint-disable-next-line
      IS_ICAN,
      form: {
        username: '',
        password: '',
        code: '',
        redomStr: '',
      },
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名/手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
        ],
      },
      // passwordType: 'password',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapActions(['LoginByUsername']),
    refreshPage () {
      this.$router.push({ path: '/login', query: { redirect: this.$route.query.redirect } })
    },
    loadPage () {
      this.refreshCode()
    },
    handleRetrieve () {
      this.$emit('tab-active', 'retrieve')
    },
    handleRegister () {
      this.$router.push({ path: '/register', query: { ...this.$route.query, isValid: true } })
    },
    refreshCode () {
      this.form.code = ''
      this.form.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${codeUrl}?randomStr=${
          this.form.randomStr
          }`)
    },
    // TODO: 展示密码
    // showPassword () {
    //   this.passwordType == ''
    //     ? (this.passwordType = 'password')
    //     : (this.passwordType = '')
    // },
    async submitForm () {
      try {
        const data = await this.LoginByUsername(this.form)
        if (data.access_token) {
          this.$emit('onredirect')
        } else {
          this.$meesage(data.msg)
          this.refreshCode()
        }
      } catch (err) {
        console.log(err)
        this.refreshCode()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form {
  margin: 10px 0;
}
.form-detail {
  width: 100%;
}
.login-text .check-text {
  float: right;
}
.login-text ::v-deep .el-button--text {
  color: $--color-primary;
}
.login-text ::v-deep .el-button--text:hover {
  color: $--menu-color-font;
}
.login-text ::v-deep .el-button--text:nth-child(1) {
  color: #666;
}
.login-text ::v-deep .el-button--text:nth-child(1):hover {
  color: #999;
}
</style>
