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
        <!-- <el-form-item prop="code">
          <a-input class="login-code" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" size="large">
            <img slot="addonAfter" :src="code.src" class="login-code-img" @click="refreshCode" />
          </a-input>
        </el-form-item> -->
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

      <template v-if="false">
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
      </template>

    </div>
    <select-dialog ref="SelectDialog" @load-page="refreshPage()" @login="handleSocialLogin()" @have="handleHave()"></select-dialog>
  </user-operation-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UserOperationLayout from './index'
import { getBindCheck } from '@/api/admin/sys-social-details'
import { openWindow } from '@/util/util'
// import { codeUrl } from '@/config/env'
// import { randomLenNum } from '@/util/util'
import { validatenull } from '@/util/validate'
import SelectDialog from './SelectDialog'
export default {
  components: {
    UserOperationLayout,
    SelectDialog,
  },
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
        code: '0000',
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
      },
      passwordType: 'password',
      loginLoading: false,
    }
  },
  watch: {
    '$route.query': {
      async handler (newName) {
        const params = newName
        if (params.isValid) {
          return
        } else {
          this.socialForm.state = params.state
          this.socialForm.code = params.code
          if (!validatenull(this.socialForm.state)) {
            const { data } = await getBindCheck(this.socialForm)
            if (data.code) {
              return
            }
            if (data.data) {
              const loading = this.$loading({
                lock: true,
                text: '登录中,请稍后。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
              setTimeout(() => {
                loading.close()
              }, 2000)
              this.handleSocialLogin()
            } else {
              // this.$message(data.msg + '请登陆后绑定账号')
              this.$refs['SelectDialog'].dialogShow = true
              this.$refs['SelectDialog'].form.code = params.code
              this.$refs['SelectDialog'].form.state = params.state
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
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
    handleHave () {
      this.$openPage('/login?redirect=/wel/account-settings/binding')
    },
    refreshPage () {
      this.$router.push({ path: '/login', query: { redirect: this.$route.query.redirect } })
    },
    handleRetrieve () {
      this.$emit('tab-active', 'retrieve')
    },
    handleRegister () {
      this.$router.push({ path: '/register', query: { ...this.$route.query, isValid: true } })
    },
    // refreshCode () {
    //   this.form.code = ''
    //   this.form.randomStr = randomLenNum(this.code.len, true)
    //   this.code.type === 'text'
    //     ? (this.code.value = randomLenNum(this.code.len))
    //     : (this.code.src = `${codeUrl}?randomStr=${
    //       this.form.randomStr
    //       }`)
    // },
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    async handleSocialLogin () {
      await this.LoginBySocial(this.socialForm)
      this._goToRedirect()
    },
    handleLogin () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loginLoading = true
            await this.LoginByUsername(this.form)
            this._goToRedirect()
          } catch (error) {
            this.$message.error(error.message)
          } finally {
            this.loginLoading = false
          }
        }
      })
    },
    _goToRedirect () {
      if (this.$route.query.redirect) {
        this.$openPage(this.$route.query.redirect)
      } else {
        this.$openPage('/')
      }
    },
    handleClick (thirdpart) {
      let appid, client_id, redirect_uri, url
      const redirect = this.$route.query.redirect || '/'
      redirect_uri = encodeURIComponent(
        window.location.origin + '/authredirect?type=login&redirect=' + redirect
      )
      if (thirdpart === 'wechat') {
        appid = 'wx92d9fe94daef034e'
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
<style lang="scss" scoped>
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
.login-form {
  margin: 10px 0;
}
.login-form i {
  color: #999;
}
.form-detail ::v-deep .el-form-item {
  margin-bottom: 15px;
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
