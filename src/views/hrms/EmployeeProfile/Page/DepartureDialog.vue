<template>
  <iep-dialog :dialog-show="dialogShow" title="离职" width="400px" @close="loadPage">
    <el-form :model="departureForm" :rules="rules" size="small" ref="departureForm" label-width="100px">
      <el-form-item label="离职时间" prop="departureTime">
        <el-date-picker v-model="departureForm.departureTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="离职原因" prop="reason">
        <el-input v-model="departureForm.reason" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('departureForm')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initdepartureForm } from '../options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      departureForm: initdepartureForm(),
      rules: {
        departureTime: [
          { required: true, message: '请选择离职时间', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请输入离职原因', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.departureForm = initdepartureForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.departureForm).then(() => {
            this.$notify({
              title: '成功',
              message: '离职成功',
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

