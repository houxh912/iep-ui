<template>
  <iep-dialog :title="methodName" :dialog-show="dialogShow" width="520px" @close="close">
    <el-form :model="form" size="small" label-width="140px">
      <el-form-item label="支付工资账户：">
        <iep-select v-model="form.wagePayAccountId" autocomplete="off" :prefix-url="`fams/bank_account/${form.id}`" placeholder="请选择户头所属组织"></iep-select>
      </el-form-item>
      <el-form-item label="开票账户：">
        <iep-select v-model="form.invoiceAccountIds" multiple autocomplete="off" :prefix-url="`fams/bank_account/${form.id}`" placeholder="请选择户头所属组织"></iep-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">确 定</iep-button>
      <iep-button @click="close">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      methodName: '设置账户',
      form: initForm(),
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    handleSubmit () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
    close () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
  },
}
</script>
