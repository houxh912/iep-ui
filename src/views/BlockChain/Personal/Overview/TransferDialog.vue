<template>
  <iep-dialog :dialog-show="dialogShow" title="转账" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="交易金额" prop="amount">
        <iep-input-amount v-model="form.amount" :max="realMaxAmount" :precision="0"></iep-input-amount>
      </el-form-item>
      <el-form-item label="交易对象：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="交易方式：" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="3">组织</el-radio>
          <el-radio :label="4">个人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">打赏</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { checkContactUser } from '@/util/rules'
import { sendAmount } from '@/api/fams/block_chain'
const initForm = () => {
  return {
    amount: 0,
    userId: '',
    user: {
      id: '',
      name: '',
    },
    remarks: '',
    type: 3,
    payType: 4,
  }
}
function toDtoForm (row) {
  const newForm = row
  newForm.userId = row.user.id
  return newForm
}
export default {
  mixins: [formMixins],
  data () {
    return {
      realMaxAmount: 0,
      dialogShow: false,
      form: initForm(),
      rules: {
        amount: [
          { type: 'number', required: true, message: '请输入的转账金额不少于 1 ', trigger: 'blur', min: 1 },
        ],
        user: [
          { required: true, validator: checkContactUser, trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请输入的转账类型 ', trigger: 'blur' },
        ],
        payType: [
          { required: true, message: '请输入的转账支付类型 ', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async submitForm () {
      const { data } = await sendAmount(toDtoForm(this.form))
      if (data.data) {
        this.$message.success('转账成功')
        this.form = initForm()
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
