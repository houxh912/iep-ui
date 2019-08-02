<template>
  <iep-dialog :dialog-show="dialogShow" title="详情" width="700px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="120px" disabled>
      <el-form-item label="收入类型：">
        <iep-div-detail :value="form.typeValue"></iep-div-detail>
      </el-form-item>

      <el-form-item label="收入时间：">
        <iep-div-detail :value="form.createTime"></iep-div-detail>
      </el-form-item>

      <el-form-item label="收入组织：">
        <iep-div-detail :value="form.orgName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="收入方式：">
        <iep-div-detail :value="dictsMap.incomeMode[form.incomeMode]"></iep-div-detail>
      </el-form-item>

      <el-form-item label="收入公司：">
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

      <el-form-item label="项目编号：">
        <iep-div-detail :value="form.projectNumber"></iep-div-detail>
      </el-form-item>

      <el-form-item label="收入金额：">
        <iep-div-detail :value="form.amount+' 元'"></iep-div-detail>
      </el-form-item>

      <!-- <el-form-item label="开票费：">
        <iep-div-detail :value="form.invoiceAmount+' 元'"></iep-div-detail>
      </el-form-item> -->

      <!-- <el-form-item label="开票组织：">
        <iep-div-detail :value="form.invoiceOrgName"></iep-div-detail>
      </el-form-item> -->
      <!-- <el-form-item label="开票税率：">
        <iep-div-detail :value="(form.invoicingTax*100)+'%'"></iep-div-detail>
      </el-form-item> -->

      <el-form-item v-if="form.parentType==='6'" label="计息比率：">
        <iep-div-detail :value="form.interestRate+'%'"></iep-div-detail>
      </el-form-item>

      <el-form-item label="备注：">
        <iep-div-detail :value="form.remarks"></iep-div-detail>
      </el-form-item>

      <el-form-item label="操作人：">
        <iep-div-detail :value="form.realName"></iep-div-detail>
      </el-form-item>

      <h2 style="text-align: center;">代收</h2>
      <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
        <el-table-column prop="orgId" label="组织名称">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.orgName"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额(元)">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.amount"></iep-div-detail>
          </template>
        </el-table-column>
      </el-table>

    </el-form>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap } from './options'
import formMixins from '@/mixins/formMixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
