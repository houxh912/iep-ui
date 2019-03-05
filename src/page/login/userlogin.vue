<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="false" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="loginForm.code" auto-complete="false" placeholder="请输入验证码">
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{ code.value }}</span>
            <img :src="code.src" class="login-code-img" @click="refreshCode" v-else />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <div class="login-text">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <div class="check-text">
          <el-button type="text">忘记密码?</el-button>
          <el-button type="text" @click.prevent="handleRegister">立即注册</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <div>
        <el-button size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
      </div>
      <el-button size="small" class="login-visiter">访客</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from '@/util/util'
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'Userlogin',
  data () {
    return {
      socialForm: {
        code: '',
        state: '',
      },
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        redomStr: '',
      },
      checked: false,
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
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
    this.refreshCode()
  },
  mounted () { },
  computed: {
    ...mapGetters(['tagWel']),
  },
  props: [],
  methods: {
    handleRegister () {
      this.$router.push('/register')
    },
    refreshCode () {
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${
          this.loginForm.randomStr
          }`)
    },
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleSocialLogin () {
      this.$store.dispatch('LoginBySocial', this.socialForm).then(() => {
        this.$router.push({ path: this.tagWel.value })
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.tagWel.value })
            })
            .catch(() => {
              this.refreshCode()
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-submit {
  display: block;
  margin: -15px auto 10px auto;
  width: 100%;
  height: 48px;
  font-size: 14px;
  text-align: center;
  border: 0px;
  background-color: #ba1b20;
  color: white;
}
.login-submit:hover {
  background-color: #f56c6c;
  color: white;
}
.login-visiter {
  display: block;
  margin: 20px auto 10px auto;
  width: 100%;
  height: 48px;
  font-size: 14px;
  text-align: center;
  border: 0px;
  background-color: #e4e4e4;
  color: black;
}
.login-visiter:hover {
  background-color: #909399;
  color: black;
}
.login-text {
  color: red;
  .check-text {
    float: right;
    color: red;
  }
}
.login-form {
  margin: 10px 0;
  i {
    color: #999;
  }
  .el-form-item__content {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-input {
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  width: 100%;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
}

</style>

