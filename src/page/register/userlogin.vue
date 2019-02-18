<template>
  <el-form class="login-form" status-icon :rules="registerRule" ref="registerForm" :model="registerForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" autocomplete="off" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" autocomplete="off" :type="passwordType" v-model="registerForm.password" placeholder="请输入你的密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="cpassword">
      <el-input size="small" autocomplete="off" :type="passwordType" v-model="registerForm.cpassword" placeholder="确认你的密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input size="small" v-model="registerForm.mobile" auto-complete="off" placeholder="请输入手机号码">
        <i slot="prefix" class="icon-shouji"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <div class="code-wrapper">
        <el-input size="small" @keyup.enter.native="handleLogin" maxlength="4" v-model="registerForm.code" auto-complete="off" placeholder="请输入验证码">
          <i slot="prefix" class="icon-yanzhengma" style="margin-top:6px;"></i>
        </el-input>
        <el-button @click="handleSend" class="msg-text" :class="[{ display: msgKey }]">{{ msgText }}</el-button>
      </div>
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
import { registerUser } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
export default {
  name: 'Userlogin',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        callback()
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
        mobile: '',
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
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur', validator: validatePass },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        cpassword: [
          { trigger: 'blur', validator: validatePass2 },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
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
      getMobileCode(this.registerForm.mobile).then(response => {
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
            console.log(data)
          })
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.code-wrapper {
  display: flex;
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
</style>