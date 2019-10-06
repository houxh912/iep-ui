<template>
  <iep-dialog :dialog-show="dialogShow" title="我是新用户" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <iep-form-item label-name="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">注册进入</iep-button>
      <iep-button type="warning" @click="handleHave()">已有账户</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import { newUserLogin } from '@/api/admin/sys-social-details'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      form: this._initForm(),
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        state: [
          { required: true, message: '请重新扫码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请重新扫码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    ...mapActions(['LoginBySocial']),
    _initForm () {
      return {
        state: '',
        code: '',
        phone: '',
      }
    },
    close () {
      this.dialogShow = false
      this.form = this._initForm()
      this.$emit('load-page')
    },
    handleHave () {
      this.dialogShow = false
      this.form = this._initForm()
      this.$emit('have')
    },
    async submitForm () {
      const { data } = await newUserLogin(this.form)
      if (data.data) {
        this.$message.success('注册成功')
        this.$emit('login')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
