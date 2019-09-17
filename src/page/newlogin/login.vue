<template>
  <user-operation-layout>
    <div class="login-wrapper">
      <div class="title">
        <h1>用户登录</h1>
      </div>
      <el-form class="form-detail" ref="form" :model="form">
        <el-form-item prop="username">
          <a-input ref="username" @keyup.enter.native="handleLogin" v-model="form.username" autocomplete="username" placeholder="请输入用户名" size="large">
            <a-icon slot="prefix" type="user" />
            <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
          </a-input>
        </el-form-item>
        <el-form-item prop="password">
          <a-input ref="password" @keyup.enter.native="handleLogin" :type="passwordType" v-model="form.password" autocomplete="current-password" placeholder="请输入密码" size="large">
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
              <a-button type="primary" size="large" :loading="loginLoading" @click="handleLogin" block>登录</a-button>
            </a-col>
            <a-col :span="12">
              <a-button class="visitor" size="large" @click="$message.success('功能开发中')" block>访客</a-button>
            </a-col>
          </a-row>
        </el-form-item>
      </el-form>

      <el-divider>其他方式登录</el-divider>
      <div class="social-container">
        <div class="box qq" @click="handleClick('tencent')">
          <span class="container">
            <i icon-class="qq" class="iconfont icon-qq"></i>
          </span>
        </div>
        <div class="box wechat" @click="handleClick('wechat')">
          <span class="container">
            <i icon-class="wechat" class="iconfont icon-weixin"></i>
          </span>
        </div>
      </div>

    </div>
  </user-operation-layout>
</template>
<script>
import { openWindow } from '@/util/util'
import UserOperationLayout from './index'
import { codeUrl } from '@/config/env'
import { randomLenNum } from '@/util/util'
import { mapGetters, mapActions } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  components: { UserOperationLayout },
  name: 'Userlogin',
  data () {
    return {
      socialForm: {
        code: '',
        state: '',
      },
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
      loginLoading: false,
    }
  },
  watch: {
    $route () {
      const params = this.$route.query
      this.socialForm.state = params.state
      this.socialForm.code = params.code
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: '登录中,请稍后。。。',
          spinner: 'el-icon-loading',
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
        this.handleSocialLogin()
      }
    },
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters(['tagWel']),
  },
  methods: {
    ...mapActions(['LoginBySocial', 'LoginByUsername']),
    emitEmpty (name) {
      this.$refs[name].focus()
      this.form[name] = ''
    },
    loadPage () {
      this.refreshCode()
    },
    handleRetrieve () {
      this.$emit('tab-active', 'retrieve')
    },
    handleRegister () {
      this.$router.push({ path: '/register', query: this.$route.query })
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
    handleSocialLogin () {
      this.LoginBySocial(this.socialForm).then(() => {
        this.$router.push({ path: this.tagWel.value })
      })
    },
    handleLogin () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loginLoading = true
            await this.LoginByUsername(this.form)
            if (this.$route.query.redirect) {
              this.$router.push({ path: this.$route.query.redirect })
            } else {
              this.$router.push({ path: this.tagWel.value })
            }
          } catch (error) {
            this.$message.error(error.message)
          } finally {
            this.loginLoading = false
            this.refreshCode()
          }
        }
      })
    },
    handleClick (thirdpart) {
      let appid, client_id, redirect_uri, url
      redirect_uri = encodeURIComponent(
        window.location.origin + '/#/authredirect'
      )
      if (thirdpart === 'wechat') {
        appid = 'wx2506d6d34d7a90aa'
        url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
      } else if (thirdpart === 'tencent') {
        client_id = '101322838'
        url =
          'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=' +
          client_id +
          '&redirect_uri=' +
          redirect_uri
      }
      openWindow(url, thirdpart, 540, 540)
    },
  },
}
</script>

<style lang="css" scoped>
.login-code >>> .ant-input {
  font-size: 14px;
}
.login-code >>> .ant-input-group-addon {
  padding: 0;
  height: 40px;
}
.login-code .login-code-img {
  padding: 1px 0;
  height: 100%;
  box-sizing: border-box;
}
.visitor {
  background-color: #e4e4e4;
  border-color: #e4e4e4;
}
.visitor:hover {
  opacity: 0.7;
  color: #666;
}
.login-text .check-text {
  float: right;
  color: red;
}
.login-text >>> .el-button--text {
  color: #ba1b20;
}
.login-text >>> .el-button--text:hover {
  color: #f56c6c;
}
.login-text >>> .el-button--text:nth-child(1) {
  color: #666;
}
.login-text >>> .el-button--text:nth-child(1):hover {
  color: #999;
}
.login-form {
  margin: 10px 0;
}
.login-form i {
  color: #999;
}
.form-detail >>> .el-form-item {
  margin-bottom: 15px;
}
.login-form >>> .el-form-item .el-form-item__content {
  margin-left: 0 !important;
  width: 100%;
}
.login-form >>> .el-input {
  padding: 0;
}
.login-form >>> .el-input .el-input__prefix i {
  padding: 0 5px;
  font-size: 16px !important;
}
</style>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-bottom: 20px;
    h1 {
      color: #888;
      font-size: 18px;
    }
  }
  .form-detail {
    width: 100%;
  }
}
.social-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 84px;
  .box {
    cursor: pointer;
    &:hover,
    &:focus {
      .title {
        opacity: 0.8;
      }
    }
  }
  .iconfont {
    color: #fff;
    font-size: 18px;
  }
  .container {
    $height: 28px;
    display: inline-block;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .wechat {
    .container {
      background-color: #8bd430;
    }
    &:hover,
    &:focus {
      .container {
        background-color: #a3e254;
      }
    }
  }
  .qq {
    .container {
      background-color: #03a9f4;
    }
    &:hover,
    &:focus {
      .container {
        background-color: #46c3fb;
      }
    }
  }
}
@media (max-width: 767px) {
  .social-container {
    margin: 20px;
  }
}
</style>
