<template>
  <iep-dialog :dialog-show="dialogShow" title="业务指标" width="520px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="140px">
      <el-form-item v-if="!isEdit" label="时间：" prop="businessDate">
        <iep-date-picker v-model="form.businessDate" type="year" :disabled="isEdit" placeholder="请选择日期"></iep-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { createUnionProject, putUnionProject } from '@/api/fams/statistics'
import { initForm, toDtoForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      rules,
      isEdit: false,
      dialogShow: false,
      form: initForm(),
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        const functionName = this.isEdit ? putUnionProject : createUnionProject
        functionName(toDtoForm(this.form)).then(({ data }) => {
          if (data.data) {
            this.$message('操作成功')
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
