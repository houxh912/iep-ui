<template>
  <iep-dialog :dialog-show="dialogShow" title="发起考核" width="550px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="140px">
      <el-form-item label="考核名称" prop="msg">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="考核时间" prop="msg">
        <iep-date-picker v-model="form.name" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </iep-date-picker>
      </el-form-item>
      <el-form-item label="考核模板" prop="msg">
        <iep-dict-select v-model="form.name" dict-name="" placeholder="请选择考核模板"></iep-dict-select>
      </el-form-item>
      <el-form-item label="被考核人" prop="msg">
        <iep-contact-select v-model="form.name"></iep-contact-select>
      </el-form-item>
      <el-form-item label="考核人" prop="msg">
        <iep-contact-select v-model="form.name"></iep-contact-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="员工自评权重" prop="msg" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考核人评分权重" prop="msg" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="考核人评分方式" prop="msg">
        <iep-dict-select v-model="form.name" dict-name="" placeholder="请选择评分方式"></iep-dict-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('departureForm')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        msg: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
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
  },
}
</script>

