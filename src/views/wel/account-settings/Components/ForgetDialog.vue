<template>
  <iep-dialog :dialog-show="dialogShow" title="重置密码" width="520px" @close="dialogShow=false">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="手机号" prop="mobile">
        <el-input v-model="form.mobile" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="验证码" prop="code">
        <el-input size="small" v-model="form.code" auto-complete="off" placeholder="请输入验证码">
          <template slot="append">
            <iep-button type="text" @click="handleSend" class="msg-text" :disabled="msgKey">{{msgText}}</iep-button>
          </template>
        </el-input>
      </iep-form-item>
      <iep-form-item label-name="新密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </iep-form-item>
      <iep-form-item label-name="确认密码" prop="newPassword2">
        <el-input type="password" v-model="form.newPassword2" auto-complete="off"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import formMixins from '@/mixins/formMixins'
import { resetPassword } from '@/api/admin/user'
import { getMobileCode } from '@/api/admin/mobile'
const initForm = (mobile = '') => {
  return {
    mobile: mobile,
    password: '',
    newPassword2: '',
    code: '',
  }
}
const MSGINIT = '发送验证码',
  MSGSCUCCESS = '${time}秒后重发',
  MSGTIME = 60
export default {
  mixins: [formMixins],
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogShow: false,
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      form: initForm(),
      rules: {
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        newPassword2: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.form = initForm(this.userInfo.phone)
  },
  methods: {
    ...mapActions(['LogOut']),
    close () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await resetPassword(this.form)
      if (data.data) {
        this.$message.success('密码设置成功，请重新登陆')
        await this.LogOut()
        this.$eventBus.$emit('logout')
        this.$router.push({ path: '/login' })
      } else {
        this.$message(data.msg)
      }
    },
    handleSend () {
      const mobile = this.form.mobile.trim()
      if (this.msgKey || mobile === '') return
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
.msg-text {
  width: 100px;
}
</style>
