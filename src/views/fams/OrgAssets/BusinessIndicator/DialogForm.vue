<template>
  <iep-dialog :dialog-show="dialogShow" title="新增业务指标" width="520px" @close="close">
    <el-form :model="form" size="small" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="组织：" prop="orgId">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织" disabled></iep-select>
      </el-form-item>
      <el-form-item label="时间：" prop="businessDate">
        <iep-date-picker v-model="form.businessDate" type="month" placeholder="请选择时间"></iep-date-picker>
      </el-form-item>
      <el-form-item label="指标金额(元)：" prop="amount">
        <iep-input-number v-model="form.amount"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { postUnionProject } from '@/api/fams/statistics'
import { initForm, toDtoForm, rules } from './options'
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
        postUnionProject(toDtoForm(this.form)).then(({ data }) => {
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
