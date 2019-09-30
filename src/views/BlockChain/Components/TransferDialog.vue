<template>
  <iep-dialog :dialog-show="dialogShow" title="转账" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <iep-form-item label-name="交易金额" prop="amount">
        <iep-input-amount v-model="form.amount" :max="realMaxAmount" :precision="0"></iep-input-amount>
      </iep-form-item>
      <iep-form-item label-name="交易方式" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="3">组织</el-radio>
          <el-radio :label="4">个人</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item v-if="form.type===4" label-name="交易对象" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </iep-form-item>
      <iep-form-item v-if="form.type===3" label-name="交易对象" prop="orgId">
        <iep-select v-model="form.orgId" filterable autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="备注" prop="remarks">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">打赏</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
// import { checkContactUser } from '@/util/rules'
import { sendAmount } from '@/api/fams/block_chain'

function toDtoForm (row) {
  const newForm = row
  let objectId = 0
  switch (newForm.type) {
    case 3:
      objectId = newForm.orgId
      break
    case 4:
      objectId = newForm.user.id
      break
    default:
      break
  }
  newForm.objectId = objectId
  return newForm
}
export default {
  props: {
    payType: {
      type: Number,
      required: true,
    },
  },
  mixins: [formMixins],
  data () {
    return {
      realMaxAmount: 0,
      dialogShow: false,
      form: this._initForm(),
      rules: {
        amount: [
          { type: 'number', required: true, message: '请输入的转账金额不少于 1 ', trigger: 'blur', min: 1 },
        ],
        // user: [
        //   { required: true, validator: checkContactUser, trigger: 'blur' },
        // ],
        orgId: [
          { required: true, message: '请选择组织', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async submitForm () {
      const { data } = await sendAmount(toDtoForm(this.form))
      if (data.data) {
        this.$message.success('转账成功')
        this.form = this._initForm()
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
    close () {
      this.form = this._initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    _initForm () {
      return {
        amount: 0,
        userId: '',
        user: {
          id: '',
          name: '',
        },
        remarks: '',
        type: 4,
        payType: this.payType,
        orgId: '',
      }
    },
  },
  watch: {
    'form.type': function () {
      this.form.user = {
        id: '',
        name: '',
      }
      this.form.orgId = ''
    },
  },
}
</script>
