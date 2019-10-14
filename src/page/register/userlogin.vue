<template>
  <el-form class="login-form" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="phone">
      <iep-ant-input v-model="form.phone" type="password" autocomplete="username" placeholder="请输入手机号码" iconfont="icon-dianhua" :disabled="!!$route.query.quick"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="code">
      <a-input-search :maxlength="4" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" @search="handleSend" size="large">
        <a-button slot="enterButton" :class="[{ display: msgKey }]">{{ msgText }}</a-button>
      </a-input-search>
    </el-form-item>
    <el-form-item prop="password">
      <iep-ant-input v-model="form.password" type="passwordType" autocomplete="new-password" placeholder="请输入密码" iconfont="icon-suoding1"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="cpassword">
      <iep-ant-input v-model="form.cpassword" type="passwordType" autocomplete="new-password" placeholder="确认你的密码" iconfont="icon-suoding1"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="realName">
      <iep-ant-input v-model="form.realName" type="user" autocomplete="name" placeholder="请输入真实姓名（可选）" iconfont="icon-denglu"></iep-ant-input>
    </el-form-item>
    <!-- <el-form-item prop="code">
      <a-input-search :maxlength="4" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" @search="handleSend" size="large">
        <a-button slot="enterButton" :class="[{ display: msgKey }]">{{ msgText }}</a-button>
      </a-input-search>
    </el-form-item> -->
    <el-form-item>
      <el-checkbox v-model="checked">同意并遵守<span class="agreement">《用户守则》</span></el-checkbox>
    </el-form-item>
    <el-form-item>
      <a-button type="primary" size="large" :loading="submitFormLoading" @click="mixinsSubmitFormGen()" block>注册</a-button>
    </el-form-item>
  </el-form>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { getMobileCode } from '@/api/admin/mobile'
import { registerUser, validRegisterUserName, validRegisterUserPhone } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
export default {
  name: 'Userlogin',
  mixins: [formMixins],
  data () {
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)) {
        return callback(new Error('4个字符以上，15个字符以下，不能以数字或符号和开头，不含中文'))
      }
      validRegisterUserName(value).then(({ data }) => {
        if (!data.data) {
          callback(new Error('该用户名已存在，无需新增。'))
        } else {
          callback()
        }
      })
    }
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        validRegisterUserPhone(value).then(({ data }) => {
          if (!data.data) {
            callback(new Error('该手机号已存在，无需新增。'))
          } else {
            callback()
          }
        })
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.cpassword !== '') {
          this.$refs.form.validateField('cpassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value, this.form.password)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      form: {
        username: '',
        password: '',
        cpassword: '',
        phone: this.$route.query.mobile || '',
        code: this.$route.query.code || '',
        randomStr: '',
      },
      checked: false,
      rules: {
        username: [
          { validator: checkUserName, trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change', validator: validatePass },
          { min: 6, message: '密码长度最少为6位', trigger: 'change' },
        ],
        cpassword: [
          { trigger: 'change', validator: validatePass2 },
          { min: 6, message: '密码长度最少为6位', trigger: 'change' },
        ],
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        code: [{ required: true, trigger: 'change', message: '请输入短信验证码' }],
      },
      passwordType: 'password',
    }
  },
  methods: {
    emitEmpty (name) {
      this.$refs[name].focus()
      this.form[name] = ''
    },
    async submitForm () {
      if (!this.checked) {
        this.$message('请先同意用户守则')
        return
      }
      const { data } = await registerUser(this.form)
      if (data.data) {
        this.$message.success('恭喜你，注册成功')
        const data = await this.$store.dispatch('LoginByPhone', {
          mobile: this.form.phone,
          code: this.form.code,
        })
        if (data.access_token) {
          this._goToRedirect()
        } else {
          this.$message(data.msg)
        }
      } else {
        this.$message(data.msg)
      }
    },
    handleSend () {
      if (this.msgKey) return
      getMobileCode(this.form.phone).then(response => {
        if (response.data.data) {
          this.$message.success('验证码发送成功')
        } else {
          this.$message.error(response.data.msg)
        }
      })

      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = true
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        if (this.msgTime == 0) {
          this.msgTime = MSGTIME
          this.msgText = MSGINIT
          this.msgKey = false
          clearInterval(time)
        }
      }, 1000)
    },
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    _goToRedirect () {
      if (this.$route.query.redirect) {
        this.$openPage(this.$route.query.redirect)
      } else {
        this.$openPage('/')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form ::v-deep .el-form-item {
  margin-bottom: 20px;
}
.login-form {
  margin: 10px 0;
  .el-form-item {
    margin-bottom: 15px;
    .el-form-item__content {
      margin-left: 0 !important;
      width: 100%;
    }
  }
  .el-input {
    padding: 0;
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.agreement {
  color: #999;
  &:hover {
    opacity: 0.7;
  }
}
@media (max-width: 320px) {
  .login-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
