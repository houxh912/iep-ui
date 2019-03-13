<template>
  <iep-dialog :dialog-show="dialogShow" title="入职新增" width="400px" @close="loadPage">
    <el-form :model="inductionForm" :rules="rules" size="small" ref="inductionForm" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="inductionForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="inductionForm.sex">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位" prop="position">
        <el-select v-model="inductionForm.position">
          <el-option label="岗位1" value="岗位1"></el-option>
          <el-option label="岗位2" value="岗位2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCard">
        <el-input v-model="inductionForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="inductionTime">
        <el-date-picker v-model="inductionForm.inductionTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('inductionForm')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initinductionForm } from '../options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      inductionForm: initinductionForm(),
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        position: [
          { required: true, message: '请选择职位', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择行呗', trigger: 'blur' },
        ],
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
        ],
        inductionTime: [
          { required: true, message: '请输入入职时间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.inductionForm = initinductionForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.inductionForm).then(() => {
            this.$notify({
              title: '成功',
              message: '入职成功',
              type: 'success',
              duration: 2000,
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

