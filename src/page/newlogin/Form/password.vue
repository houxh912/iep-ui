<template>
  <el-form class="form-detail login-form" ref="form" :model="form">
    <el-form-item prop="username">
      <a-input ref="username" v-model="form.username" autocomplete="username" placeholder="请输入用户名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="password">
      <a-input ref="password" :type="passwordType" v-model="form.password" autocomplete="current-password" placeholder="请输入密码" size="large">
        <a-icon slot="prefix" type="lock" />
        <a-icon v-if="form.password" slot="suffix" :type="passwordType?'eye-invisible':'eye'" @click="showPassword" />
      </a-input>
    </el-form-item>
    <el-form-item prop="code">
      <a-input class="login-code" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" size="large">
        <img slot="addonAfter" :src="code.src" class="login-code-img" @click="refreshCode" />
      </a-input>
    </el-form-item>
    <el-form-item>
      <div class="login-text">
        将保持登陆状态
        <div class="check-text">
          <el-button type="text" @click="handleRetrieve">忘记密码?</el-button>
          <el-button type="text" @click="handleRegister">立即注册</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <a-row :gutter="8">
        <a-col :span="12">
          <a-button type="primary" size="large" :loading="submitFormLoading" @click="mixinsSubmitFormGen()" block>登录</a-button>
        </a-col>
        <a-col :span="12">
          <a-button class="visitor" size="large" @click="$message.success('功能开发中')" block>访客</a-button>
        </a-col>
      </a-row>
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
      passwordType: 'password',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapActions(['LoginByUsername']),
    emitEmpty (name) {
      this.$refs[name].focus()
      this.form[name] = ''
    },
    handleHave () {
      this.$openPage('/login?redirect=/wel/account-settings/binding')
    },
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
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    async submitForm () {
      const data = await this.LoginByUsername(this.form)
      if (data.access_token) {
        this.$emit('onredirect')
      } else {
        this.$meesage(data.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form {
  margin: 10px 0;
}
.login-form i {
  color: #999;
}
.login-form ::v-deep .el-form-item .el-form-item__content {
  margin-left: 0 !important;
  width: 100%;
}
.login-form ::v-deep .el-input {
  padding: 0;
}
.login-form ::v-deep .el-input .el-input__prefix i {
  padding: 0 5px;
  font-size: 16px !important;
}

.form-detail ::v-deep .el-form-item {
  margin-bottom: 15px;
}
.form-detail {
  width: 100%;
}

.login-code ::v-deep .ant-input {
  font-size: 14px;
}
.login-code ::v-deep .ant-input-group-addon {
  padding: 0;
  height: 40px;
}
.login-code .login-code-img {
  padding: 1px 0;
  height: 100%;
  box-sizing: border-box;
}

.login-text .check-text {
  float: right;
  color: red;
}
.login-text ::v-deep .el-button--text {
  color: #ba1b20;
}
.login-text ::v-deep .el-button--text:hover {
  color: #f56c6c;
}
.login-text ::v-deep .el-button--text:nth-child(1) {
  color: #666;
}
.login-text ::v-deep .el-button--text:nth-child(1):hover {
  color: #999;
}

.visitor {
  background-color: #e4e4e4;
  border-color: #e4e4e4;
}
.visitor:hover {
  opacity: 0.7;
  color: #666;
}
</style>
