<template>
  <user-operation-layout class="login-wrapper">
    <div>
      <div class="title">
        <h1>用户登录</h1>
      </div>
      <el-form class="form-detail" ref="form" :model="form">
        <el-form-item prop="username">
          <a-input ref="username" @keyup.enter.native="handleLogin" v-model="form.username" auto-complete="off" placeholder="请输入用户名" size="large">
            <a-icon slot="prefix" type="user" />
            <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
          </a-input>
        </el-form-item>
        <el-form-item prop="password">
          <a-input ref="password" @keyup.enter.native="handleLogin" :type="passwordType" v-model="form.password" auto-complete="false" placeholder="请输入密码" size="large">
            <a-icon slot="prefix" type="lock" />
            <a-icon v-if="form.password" slot="suffix" :type="passwordType?'eye-invisible':'eye'" @click="showPassword" />
          </a-input>
        </el-form-item>
        <el-form-item prop="code">
          <a-input class="login-code" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="form.code" auto-complete="false" placeholder="请输入验证码" size="large">
            <img slot="addonAfter" :src="code.src" class="login-code-img" @click="refreshCode" />
          </a-input>
        </el-form-item>
        <!-- <el-form-item prop="username">
              <el-input v-model="form.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" :type="passwordType" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item> -->
      </el-form>
    </div>
  </user-operation-layout>
</template>
<script>
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
        isKeepLogin: false,
      },
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      rules: {
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
    ...mapActions(['LoginBySocial', 'LoginByUsername', 'GetMenu', 'LoadAllDictMap']),
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
      this.$router.push('/register')
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
            const data = await this.GetMenu()
            await this.LoadAllDictMap()
            this.$router.$avueRouter.formatRoutes(data, true)
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
  },
}
</script>

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
      font-weight: 600;
    }
  }
  .form-detail {
    width: 100%;
  }
}
</style>
