<template>
  <iep-dialog :dialog-show="dialogShow" title="详情" width="700px" @close="loadPage">
    <iep-no-data v-if="!forms.length"></iep-no-data>
    <div v-for="form in forms" :key="form.expenditureId">
      <el-form :model="form" size="small" ref="form" label-width="120px" disabled>
        <el-form-item label="支出类型：">
          <iep-div-detail :value="form.typeValue"></iep-div-detail>
        </el-form-item>

        <el-form-item label="支出时间：">
          <iep-div-detail :value="form.createTime"></iep-div-detail>
        </el-form-item>

        <el-form-item label="支出组织：">
          <iep-div-detail :value="form.orgName"></iep-div-detail>
        </el-form-item>

        <el-form-item label="支出方式：">
          <iep-div-detail :value="dictsMap.expenditureMode[form.expenditureMode]"></iep-div-detail>
        </el-form-item>

        <el-form-item label="支出公司：">
          <iep-div-detail :value="form.companyName"></iep-div-detail>
        </el-form-item>

        <el-form-item label="银行户头：">
          <iep-div-detail :value="form.accountName"></iep-div-detail>
        </el-form-item>

        <el-form-item label="关联合同：">
          <iep-div-detail :value="form.protocolName"></iep-div-detail>
        </el-form-item>

        <el-form-item label="关联项目：">
          <iep-div-detail :value="form.projectName"></iep-div-detail>
        </el-form-item>

        <el-form-item label="支出金额：">
          <iep-div-detail :value="form.amount+' 元'"></iep-div-detail>
        </el-form-item>

        <el-form-item v-if="form.parentType==='6'" label="计息比率：">
          <iep-div-detail :value="form.interestRate+'%'"></iep-div-detail>
        </el-form-item>

        <el-form-item label="备注：">
          <iep-div-detail :value="form.remarks"></iep-div-detail>
        </el-form-item>
      </el-form>

      <iep-divider></iep-divider>

    </div>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { dictsMap } from './options'
export default {
  props: {
    forms: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
    }
  },
  methods: {
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
