<template>
  <iep-dialog :dialog-show="dialogShow" title="修改手机号" width="520px" @close="dialogShow=false">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="新手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </iep-form-item>
      <iep-form-item label-name="验证码" prop="code">
        <el-input size="small" v-model="form.code" auto-complete="off" placeholder="请输入验证码">
          <template slot="append">
            <span @click="handleSend" class="msg-text" :class="[{display:msgKey}]">{{msgText}}</span>
          </template>
        </el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { changeMobile } from '@/api/admin/sys-social-details'
import { getMobileCode } from '@/api/admin/mobile'
import { validRegisterUserPhone } from '@/api/login'
import { isvalidatemobile } from '@/util/validate'
const initForm = () => {
  return {
    mobile: '',
    code: '',
  }
}
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
          console.log(data)
          if (!data.data) {
            callback(new Error('该手机号已绑定'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      dialogShow: false,
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      form: initForm(),
      rules: {
        mobile: [
          { required: true, validator: validatePhone, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await changeMobile(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
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
    }  },
}
</script>
