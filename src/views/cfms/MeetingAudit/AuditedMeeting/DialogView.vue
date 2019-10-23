<template>
  <iep-dialog :dialog-show="dialogShow" title="请填写拒绝原因" width="50%" @close="close">
    <el-form :model="formData" label-width="120px" ref="formName" :rules="rules">
      <el-form-item label="拒绝原因：" prop="meetingReason">
        <el-input v-model="formData.meetingReason" type="textarea" :autosize="{ minRows: 4}"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="button" type="primary" @click="handleSubmit('formName')">保存</iep-button>
      <iep-button class="button" type="primary" @click="handleCancel('formName')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postMeetingmarketingAudit } from '@/api/mcms/meeting'
export default {
  data () {
    return {
      dialogShow: false,
      formData: { meetingReason: '' },
      id: '',
      edit: '保存',
      rules: { meetingReason: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }] },
    }
  },
  created () {

  },
  methods: {
    handleSubmit () {
      if (this.edit == '保存') {
        postMeetingmarketingAudit({ id: this.id, meetingFlag: 5, meetingReason: this.formData.meetingReason }).then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
          this.dialogShow = false
          this.$emit('loadPage')
        })
      } else if (this.edit == '修改') {
        postMeetingmarketingAudit({ id: this.id, meetingFlag: 5, meetingReason: this.formData.meetingReason, updateStatu: 1 }).then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
          this.dialogShow = false
          this.$emit('loadPage')
        })
      }

    },
    handleCancel () {
      this.dialogShow = false
    },
    close () {
      this.dialogShow = false
    },
  },
}
</script>