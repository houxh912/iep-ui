<template>
  <iep-dialog :dialog-show="dialogShow" title="指导建议" width="50%" @close="resetForm(false)">
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item label="" prop="guideSugges">
        <el-input type="textarea" placeholder="请输入指导建议" rows=5 v-model="formData.guideSugges"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm(false)">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
import { updateData } from '@/api/gpms/index'

function initFormData () {
  return {
    id: '',
    guideSugges: '',
    approvalStatus: 3,
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
        guideSugges: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
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
