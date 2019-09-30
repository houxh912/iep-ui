<template>
  <iep-dialog :dialog-show="dialogShow" title="捐助" width="520px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="可用余额：">
        <iep-div-detail :value="`${displayTotalAsset}贝`"></iep-div-detail>
      </el-form-item>
      <el-form-item label="捐助金额：" prop="amount">
        <iep-input-number v-model="form.amount" :precision="2" :max="displayTotalAsset" :min="1"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
      displayTotalAsset: 0,
      rules,
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
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
