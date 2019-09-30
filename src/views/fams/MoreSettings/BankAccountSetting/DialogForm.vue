<template>
  <iep-dialog :title="methodName" :dialog-show="dialogShow" width="520px" @close="close">
    <el-form ref="form" :model="form" size="small" :rules="rules" label-width="160px">
      <el-form-item label="银行户头名称：" prop="accountName">
        <el-input v-model="form.accountName" autocomplete="off" placeholder="请输入银行户头名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="户头所属公司：">
        <iep-select v-model="form.companyIds" multiple autocomplete="off" prefix-url="fams/company" placeholder="请选择户头所属公司"></iep-select>
      </el-form-item> -->
      <!-- <el-form-item label="是否为工资支付账户：">
        <el-switch v-model="form.isWagePay" active-text="是" inactive-text="否" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item> -->
      <!-- <el-form-item label="是否为开票账户：">
        <el-switch v-model="form.isInvoiceingPay" active-text="是" inactive-text="否" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item> -->
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">确 定</iep-button>
      <iep-button @click="close">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      form: initForm(),
      rules: {
        accountName: [
          { required: true, message: '请填写银行户头名称', trigger: 'blur' },
        ],
      },
      methodName: '新增',
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
    close () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
  },
}
</script>
