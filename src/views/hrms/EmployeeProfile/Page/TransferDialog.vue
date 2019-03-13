<template>
  <iep-dialog :dialog-show="dialogShow" title="调动" width="400px" @close="loadPage">
    <el-form :model="transferForm" :rules="rules" size="small" ref="transferForm" label-width="100px">
      <el-form-item label="选择部门" prop="dept">
        <el-select v-model="transferForm.dept" placeholder="请选择">
          <el-option label="国脉先锋队" value="国脉先锋队">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位" prop="position">
        <el-select v-model="transferForm.position" placeholder="请选择">
          <el-option label="产品经理" value="产品经理">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="job">
        <el-select v-model="transferForm.job" placeholder="请选择">
          <el-option label="中级管理员" value="中级管理员">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-select v-model="transferForm.title" placeholder="请选择">
          <el-option label="数据分析员" value="数据分析员">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调动时间" prop="transferTime">
        <el-date-picker v-model="transferForm.transferTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('transferForm')">调动</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { inittransferForm } from '../options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      transferForm: inittransferForm(),
      rules: {
        dept: [
          { required: true, message: '请输入部门', trigger: 'blur' },
        ],
        position: [
          { required: true, message: '请输入岗位', trigger: 'blur' },
        ],
        job: [
          { required: true, message: '请输入职务', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入职称', trigger: 'blur' },
        ],
        transferTime: [
          { required: true, message: '请输入时间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.transferForm = inittransferForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.transferForm).then(() => {
            this.$notify({
              title: '成功',
              message: '调动人员成功',
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
