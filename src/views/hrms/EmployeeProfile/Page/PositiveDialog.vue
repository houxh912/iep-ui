<template>
  <iep-dialog :dialog-show="dialogShow" title="转正" width="400px" @close="loadPage">
    <el-form :model="positiveFrom" :rules="rules" size="small" ref="positiveFrom" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="positiveFrom.name" readonly></el-input>
      </el-form-item>
      <el-form-item label="岗位">
        <el-input v-model="positiveFrom.position" readonly></el-input>
      </el-form-item>
      <el-form-item label="转正时间" prop="positiveTime">
        <el-date-picker v-model="positiveFrom.positiveTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('positiveFrom')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initpositiveForm } from '../options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      positiveFrom: initpositiveForm(),
      rules: {
        positiveTime: [
          { required: true, message: '请输入转正时间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.positiveFrom = initpositiveForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.positiveFrom).then(() => {
            this.$notify({
              title: '成功',
              message: '转正成功',
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

