<template>
  <iep-dialog :dialog-show="dialogShow" title="业务指标" width="520px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="140px">
      <el-form-item label="时间：">
        <iep-div-detail :value="form.businessYear+'年'"></iep-div-detail>
      </el-form-item>
      <el-form-item label="金额：" prop="amount">
        <iep-input-number v-model="form.amount" placeholder="请输入金额"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { putUnionProject } from '@/api/fams/statistics'
import { initForm, toDtoForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      rules,
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
        putUnionProject(toDtoForm(this.form)).then(({ data }) => {
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
