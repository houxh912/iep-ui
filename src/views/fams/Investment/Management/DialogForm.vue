<template>
  <iep-dialog :dialog-show="dialogShow" :title="`投资 - ${methodName}`" width="500px" @close="close">
    <el-form class="form-detail" ref="form" :model="form" :rules="rules" label-width="120px" size="small">
      <iep-form-item label-name="组织" prop="orgId">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="总股本" prop="allSharesNumber">
        <iep-input-number v-model="form.allSharesNumber" step-strictly></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="确认总股本" prop="cAllSharesNumber">
        <iep-input-number v-model="form.cAllSharesNumber" step-strictly></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="发行价" prop="sharesUnivalent">
        <iep-input-amount v-model="form.sharesUnivalent" disabled></iep-input-amount>
      </iep-form-item>
      <iep-form-item label-name="持有类型" prop="holdType">
        <iep-dict-select v-model="form.holdType" dict-name="FAMS_HOLD_TYPE" disabled></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="持有比例">
        100%
      </iep-form-item>
      <iep-form-item label-name="股本类型" prop="equityType">
        <iep-dict-select v-model="form.equityType" dict-name="FAMS_EQUITY_TYPE" disabled></iep-dict-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button @click="handleSubmit" type="primary">保存</iep-button>
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
      form: initForm(),
      methodName: '新增',
      rules,
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async handleSubmit () {
      if (this.form.allSharesNumber !== this.form.cAllSharesNumber) {
        this.$message('请确认总数本一致！')
        return
      }
      try {
        await this.mixinsValidate()
        this.formRequestFn(this.form).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.close()
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
}
</script>