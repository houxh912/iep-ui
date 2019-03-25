<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="mobile">
      <el-input v-model="loginForm.mobile" auto-complete="off" placeholder="请输入手机号码">
        <i slot="prefix" class="icon-shouji"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <div class="code-wrapper">
        <el-input class="code-input" @keyup.enter.native="handleLogin" maxlength="4" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码">
          <i slot="prefix" class="icon-yanzhengma" style="margin-top:6px;"></i>
        </el-input>
        <el-button @click="handleSend" class="msg-text" :class="[{ display: msgKey }]">{{ msgText }}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
import { isvalidatemobile } from '@/util/validate'
import { mapGetters } from 'vuex'
import { getMobileCode } from '@/api/admin/mobile'
export default {
  name: 'Codelogin',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length != 4) {
        callback(new Error('请输入4位数的验证码'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        mobile: '',
        code: '',
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
      },
    }
  },
  created () { },
  mounted () { },
  computed: {
    ...mapGetters(['tagWel']),
  },
  props: [],
  methods: {
    handleSend () {
      if (this.msgKey) return
      getMobileCode(this.loginForm.mobile).then(response => {
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
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByPhone', this.loginForm).then(() => {
            this.$router.push({ path: this.tagWel.value })
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
</style>
<style lang="css" scoped>
.login-form >>> .el-form-item  .el-input {
  padding: 0;
}
@media(max-width:320px) {
  .login-form {
    margin-top: 20px;
  }
}
</style>