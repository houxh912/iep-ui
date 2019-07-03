<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}大事记`" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px" class="form-detail">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="日期：" prop="happenTime">
        <iep-date-picker v-model="form.happenTime"></iep-date-picker>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <iep-input-area v-model="form.content"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { initForm, rules } from './options'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo']),
  },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log('userInfo: ' , this.userInfo)
        this.form.orgId = this.userInfo.orgId
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
