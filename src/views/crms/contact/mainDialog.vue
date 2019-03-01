<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}组织`" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">

      <el-form-item label="联系人姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人职务" prop="zhiwu">
        <el-input v-model="formData.zhiwu"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="dianhua">
        <el-input v-model="formData.dianhua"></el-input>
      </el-form-item>
      <el-form-item label="对应客户" prop="kehu">
        <el-input v-model="formData.kehu"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="shouji">
        <el-input v-model="formData.shouji"></el-input>
      </el-form-item>
      <el-form-item label="传真" prop="chuanzhen">
        <el-input v-model="formData.chuanzhen"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="formData.qq"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="weixin">
        <el-input v-model="formData.weixin"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="youxiang">
        <el-input v-model="formData.youxiang"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="dizhi">
        <el-input v-model="formData.dizhi"></el-input>
      </el-form-item>
      <el-form-item label="客户关注" prop="guanzhi">
        <el-input v-model="formData.guanzhi"></el-input>
      </el-form-item>
      <el-form-item label="其他" prop="qita">
        <el-input v-model="formData.qita"></el-input>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitForm('form')">{{methodName}}</el-button>
      <el-button @click="resetForm">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initForm } from './const'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        isOpen: [],
        intro: [
          { required: true, message: '请填写组织描述', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    resetForm () {
      // this.$refs[formName].resetFields()
      this.formData = initForm()
      this.dialogShow = false
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
