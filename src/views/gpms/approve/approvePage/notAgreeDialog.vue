<template>
  <iep-dialog :dialog-show="dialogShow" title="不同意理由" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item label="" prop="approvalFailReason">
        <el-input type="textarea" placeholder="请输入不同意的理由" rows=5 v-model="formData.approvalFailReason"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import { updateData } from '@/api/gpms/index'
function initFormData () {
  return {
    id: '',
    approvalFailReason: '',
    approvalStatus: 4,
  }
}

export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formData: initFormData(),
      shareRules: {},
      rules: {
        approvalFailReason: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      },
    }
  },
  methdos: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateData(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000,
            })
            this.resetForm(true)
          })
        } else {
          return false
        }
      })
    },
    resetForm (state) {
      this.formData = initFormData()
      this.$emit('close', state)
      this.dialogShow = false
    },
  },
}
</script>
