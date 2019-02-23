<template>
  <el-form class="login-form" status-icon :rules="registerRule" ref="registerForm" :model="registerForm" label-width="0">
    <el-form-item prop="username">
      <el-input autocomplete="off" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名">

      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input autocomplete="off" :type="passwordType" v-model="registerForm.password" placeholder="请输入你的密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>

      </el-input>
    </el-form-item>
    <el-form-item prop="cpassword">
      <el-input autocomplete="off" :type="passwordType" v-model="registerForm.cpassword" placeholder="确认你的密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>

      </el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input v-model="registerForm.phone" auto-complete="off" placeholder="请输入手机号码">

      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <div class="code-wrapper">
        <el-input @keyup.enter.native="handleLogin" maxlength="4" v-model="registerForm.code" auto-complete="off" placeholder="请输入验证码">
        </el-input>
        <el-button @click="handleSend" class="msg-text" :class="[{ display: msgKey }]">{{ msgText }}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">同意并遵守 《用户守则》</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleRegister" class="login-submit">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from '@/util/util'
import { mapGetters } from 'vuex'
import { getMobileCode } from '@/api/admin/mobile'
import { registerUser, validRegisterUserName, validRegisterUserPhone } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
export default {
  name: 'Userlogin',
  data () {
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
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
        if (this.registerForm.cpassword !== '') {
          this.$refs.registerForm.validateField('cpassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      registerForm: {
        username: '',
        password: '',
        cpassword: '',
        phone: '',
        code: '',
        randomStr: '',
      },
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      checked: false,
      registerRule: {
        username: [
          { validator: checkUserName, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur', validator: validatePass },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        cpassword: [
          { trigger: 'blur', validator: validatePass2 },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
      },
      passwordType: 'password',
    }
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
    handleSend () {
      if (this.msgKey) return
      getMobileCode(this.registerForm.phone).then(response => {
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
    refreshCode () {
      this.registerForm.code = ''
      this.registerForm.randomStr = randomLenNum(this.code.length, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${
          this.registerForm.randomStr
          }`)
    },
    showPassword () {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          registerUser(this.registerForm).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success',
              })
              this.$router.push('/login')
            } else {
              this.$message({
                message: data.msg,
                type: 'warning',
              })
            }
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
  margin: 10px auto 10px auto;
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
.code-wrapper {
  display: flex;
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
    margin-bottom: 20px;
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
.msg-text {
  display: block;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.msg-text.display {
  color: #ccc;
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
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