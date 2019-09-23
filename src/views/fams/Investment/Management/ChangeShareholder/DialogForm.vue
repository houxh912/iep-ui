<template>
  <iep-dialog :dialog-show="dialogShow" :title="`股东 - ${methodName}`" width="600px" @close="close">
    <el-form class="form-detail" ref="form" :model="form" :rules="rules" label-width="150px" size="small">
      <iep-form-item label-name="持有类型" prop="holdType">
        <iep-dict-select v-model="form.holdType" dict-name="FAMS_HOLD_TYPE" :disabled="isEdit" :disabled-ids="['1']"></iep-dict-select>
      </iep-form-item>
      <iep-form-item v-if="form.holdType==='2'" label-name="股东(组织)" prop="orgId">
        <iep-select v-model="form.orgId" prefix-url="admin/org/all" placeholder="请选择组织" :disabled="isEdit"></iep-select>
      </iep-form-item>
      <iep-form-item v-if="form.holdType==='3'" label-name="股东(个人)" prop="user">
        <iep-contact-select v-model="form.user" :disabled="isEdit"></iep-contact-select>
      </iep-form-item>
      <iep-form-item v-if="form.holdType==='4'" label-name="股东(外部)" prop="externalShareholder">
        <el-input v-model="form.externalShareholder" placeholder="请填写外部股东" :disabled="isEdit" />
      </iep-form-item>
      <iep-form-item label-name="股份数量" prop="investmentNumber">
        <iep-input-number v-model="form.investmentNumber" step-strictly></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="股本类型" prop="equityType">
        <iep-dict-select v-model="form.equityType" dict-name="FAMS_EQUITY_TYPE" disabled></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="股份比例">
        {{radioData}}%
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
      allSharesNumber: 0,
      isEdit: false,
      form: initForm(),
      methodName: '新增',
      rules,
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  computed: {
    radioData () {
      const data = (this.form.investmentNumber / this.allSharesNumber * 100).toFixed(2)
      return data
    },
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        this.form.userId = this.form.user.id
        this.formRequestFn(this.form).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.dialogShow = false
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