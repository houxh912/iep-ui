<template>
  <iep-dialog :dialog-show="dialogShow" title="发币" width="500px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="发币金额" prop="amount">
        <iep-input-amount v-model="form.amount"></iep-input-amount>
      </iep-form-item>
      <iep-form-item label-name="备注" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { issuedAmount } from '@/api/fams/block_chain'
const initForm = () => {
  return {
    amount: 0,
    remarks: '',
  }
}
export default {
  mixins: [formMixins],
  data () {
    return {
      form: initForm(),
      dialogShow: false,
      rules: {
        amount: [
          { type: 'number', required: true, message: '请输入的发币金额不少于 1 ', trigger: 'blur', min: 1 },
        ],
        remarks: [
          { required: true, message: '请输入的备注', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await issuedAmount(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
