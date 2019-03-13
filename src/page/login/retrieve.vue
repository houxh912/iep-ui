<template>
  <div class="retrieve-con">
    <el-steps :active="active" finish-status="success">
      <el-step description="输入账号"></el-step>
      <el-step description="重置密码"></el-step>
      <el-step description="完成"></el-step>
    </el-steps>
    <el-form v-if="active === 0" class="login-form" status-icon :rules="registerRule" ref="registerForm" :model="registerForm" label-width="0px">
      <el-form-item prop="phone">
        <el-input v-model="registerForm.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item class="input-last" prop="code">
        <div class="code-wrapper">
          <el-input @keyup.enter.native="handleLogin" maxlength="4" v-model="registerForm.code" auto-complete="off" placeholder="短信验证码">
          </el-input>
          <el-button @click="handleSend" class="msg-text" :class="[{ display: msgKey }]">{{ msgText }}</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <iep-button type="primary" class="login-submit" @click="active ++ ">下一步</iep-button>
      </el-form-item>
    </el-form>
    <el-form v-if="active === 1" class="login-form" status-icon :rules="registerRule" ref="registerForm" :model="registerForm" label-width="0">
      <el-form-item prop="password">
        <el-input autocomplete="off" :type="passwordType" v-model="registerForm.password" placeholder="新密码">
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="input-last" prop="cpassword">
        <el-input autocomplete="off" :type="passwordType" v-model="registerForm.cpassword" placeholder="再次输入密码">
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <iep-button type="primary" class="login-submit" @click="active ++ ">确定</iep-button>
      </el-form-item>
    </el-form>
    <div v-if="active === 2" class="login-menu">
      <div class="center-image"><img src="/img/finishLogin.jpg"></div>
      <p>重置密码成功<a href="#" @click.prevent="handleLogin">立即登录</a></p>
    </div>
  </div>
</template>
<script>
import { randomLenNum } from '@/util/util'
import { mapGetters } from 'vuex'
import { getMobileCode } from '@/api/admin/mobile'
import { registerUser, validRegisterUserName, validRegisterUserPhone } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const MSGINIT = '获取验证码',
MSGSCUCCESS = '${time}秒后重发',
MSGTIME = 60
export default {
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
      active: 0,
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
  methods: {
    handleLogin () {
      this.$emit('tab-active', 'user')
    },
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
ul, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style-image: none;
}
.center-image {
  text-align: center;
  img {
    max-width: 150px;
  }
}
.login-submit {
  display: block;
  margin: 0 auto 10px auto;
  width: 100%;
  height: 40px;
  font-size: 14px;
  text-align: center;
  border: 0px;
  background-color: #ba1b20;
  color: white;
}

.login-menu {
  width: 100%;
  text-align: center;
  p {
    font-size: 14px;
  }
  a {
    color: #ba1b20;
    margin: 0px 8px;
    &:hover {
      color: #f56c6c;
    }
  }
}
.login-submit:hover {
  background-color: #f56c6c !important;
  color: #fff !important;
}
.input-last {
  margin-bottom: 34px;
}
.code-wrapper {
  display: flex;
  .el-input {
    padding: 0;
  }
}
.msg-text {
  display: block;
  margin-left: -1px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  &:hover,&:focus {
    border-color: #dcdfe6;
    background-color: #fff7ec;
    color: #bf051a;
  }
}
.msg-text.display {
  color: #ccc;
}
@media(max-width:320px){
  .retrieve-con {
    .el-steps--horizontal {
      margin-bottom:10px;
    }
  }
}
</style>
<style lang="css" scoped>
.login-form >>> .el-input{
  padding: 0;
} 
.code-wrapper >>> .el-input .el-input__inner {
  border-radius: 4px 0 0 4px; 
} 
.retrieve-con >>> .el-step__head.is-process {
  border: 0;
  color: #666;
}
.retrieve-con >>> .el-step__line {
  border-bottom: 1px dashed #c0c4cc;
  background-color: #fff;
}
.retrieve-con >>> .el-step__icon {
  width: 23px;
  height: 23px;
  border: 0;
  background-color: #f0f0f0;
}
.retrieve-con >>> .is-process .el-step__icon {
  background-color: #bf051a;
  color: #fff;
}
.retrieve-con >>> .el-step__icon-inner {
  font-weight: 400;
}
.retrieve-con >>> .el-step__main {
  margin-top: 10px;
}
.retrieve-con >>> .el-steps--horizontal {
  margin: 50px 50px 40px;
}
.retrieve-con >>> .el-step__icon-inner.is-status, .retrieve-con >>> .el-step__description.is-success {
  color: #666;
}
.retrieve-con >>> .el-step__head.is-success {
  border: 0;
  color: #fff;
}
.retrieve-con >>> .el-step__head.is-success .el-step__line-inner {
  border-style: dashed;
  border-color: #fff;
}
</style>