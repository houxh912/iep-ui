<template>
  <iep-dialog :dialog-show="dialogShow" title="合同移交" width="40%" @close="resetForm">
    
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-right: 20px;" class="form-detail">
      <el-form-item label="移交给：" prop="receiverList">
        <iep-contact-select v-model="formData.userObj"></iep-contact-select>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { contractTransfer } from '@/api/mlms/material/datum/contract'

export default {
  data () {
    return {
      dialogShow: false,
      rules: {
        userObj: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      },
      formData: {
        userObj: {
          id: '',
          name: '',
        },
        contractIds: [],
      },
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    open (data) {
      this.dialogShow = true
      this.formData = {
        userObj: {
          id: '',
          name: '',
        },
        contractIds: [data.id],
      }
    },
    submitForm () {
      let id = this.formData.userObj.id
      if (!id) {
        return
      }
      contractTransfer({
        contractIds: this.formData.contractIds,
        userId: id,
      }).then(() => {
        this.$message({
          message: '移交成功',
          type: 'success',
        })
        this.$emit('load-page')
        this.dialogShow = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
