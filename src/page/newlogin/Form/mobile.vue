<template>
  <el-form class="form-detail login-form" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="mobile">
      <a-input ref="mobile" v-model="form.mobile" auto-complete="tel" placeholder="请输入手机号码" size="large">
        <a-icon slot="prefix" type="phone" />
        <a-icon v-if="form.mobile" slot="suffix" type="close-circle" @click="emitEmpty('mobile')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="code">
      <a-input-search :maxlength="4" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" @search="handleSend" size="large">
        <a-button slot="enterButton" :class="[{ display: msgKey }]">{{ msgText }}</a-button>
      </a-input-search>
    </el-form-item>
    <el-form-item>
      <a-row :gutter="8">
        <a-col :span="12">
          <a-button type="primary" size="large" :loading="submitFormLoading" @click="mixinsSubmitFormGen()" block>登录</a-button>
        </a-col>
        <a-col :span="12">
          <a-button size="large" @click="$openPage(`/register?mobile=${form.mobile}`)" block>注册</a-button>
        </a-col>
      </a-row>
    </el-form-item>
  </el-form>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { getMobileCode } from '@/api/admin/mobile'
import { validRegisterUserPhone } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
export default {
  mixins: [formMixins],
  data () {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        validRegisterUserPhone(value).then(({ data }) => {
          if (data.data) {
            callback(new Error('该手机号不存在，请注册'))
          } else {
            callback()
          }
        })
      }
    }

    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      form: {
        mobile: '',
        code: '',
        randomStr: '',
      },
      rules: {
        mobile: [{ required: true, trigger: 'change', validator: validatePhone }],
        code: [{ required: true, trigger: 'change', message: '请输入短信验证码' }],
      },
    }
  },
  methods: {
    emitEmpty (name) {
      this.$refs[name].focus()
      this.form[name] = ''
    },
    async submitForm () {
      const data = await this.$store.dispatch('LoginByPhone', this.form)
      if (data.access_token) {
        this.$emit('onredirect')
      } else {
        this.$message(data.msg)
      }
    },
    handleSend () {
      if (this.msgKey) return
      getMobileCode(this.form.mobile).then(response => {
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
</style>
