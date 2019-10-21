<template>
  <el-form class="form-detail login-form" status-icon :rules="rules" ref="form" :model="form" label-width="0">
    <el-form-item prop="mobile">
      <iep-ant-input v-model="form.mobile" type="phone" autocomplete="username" placeholder="请输入手机号码" iconfont="icon-dianhua"></iep-ant-input>
    </el-form-item>
    <el-form-item prop="code">
      <iep-ant-input v-model="form.code" inputType="right-mobile" autocomplete="one-time-code" placeholder="请输入验证码" :msgText="msgText" :inputDisabled="msgKey" :handleSend="handleSend"></iep-ant-input>
    </el-form-item>
    <el-form-item>
      <a-row :gutter="8">
        <a-col :span="12">
          <iep-button class="iep-btn-block" type="primary" size="medium" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">登 录</iep-button>
        </a-col>
        <a-col :span="12">
          <iep-button class="iep-btn-block" size="medium" @click="$openPage(`/register?mobile=${form.mobile}&code=${form.code}&quick=true`)">注 册</iep-button>
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
    async submitForm () {
      const data = await this.$store.dispatch('LoginByPhone', this.form)
      if (data.access_token) {
        this.$emit('onredirect')
      } else {
        this.$message(data.msg)
      }
    },
    handleSend () {
      if (isvalidatemobile(this.form.mobile)[0]) {
        this.$message('手机号错误')
        return
      }
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
.form-detail {
  width: 100%;
}
</style>
