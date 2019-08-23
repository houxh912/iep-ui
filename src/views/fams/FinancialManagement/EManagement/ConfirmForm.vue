<template>
  <iep-dialog :dialog-show="dialogShow" title="详情" width="700px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" label-width="120px">

      <el-form-item label="支出类型：">
        <iep-dict-cascader dictName="fams_expenditure_type" v-model="form.type" disabled></iep-dict-cascader>
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
        <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" disabled></iep-select>
      </el-form-item>

      <el-form-item label="银行户头：" v-if="!bankAmountOption.disabled">
        <iep-select v-model="form.accountId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" disabled></iep-select>
      </el-form-item>

      <el-form-item label="关联合同：">
        <iep-div-detail :value="form.protocolName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="关联项目：">
        <iep-div-detail :value="form.projectName"></iep-div-detail>
      </el-form-item>

      <el-form-item label="项目编号：">
        <iep-div-detail :value="form.serialNo"></iep-div-detail>
      </el-form-item>

      <el-form-item label="支出金额：">
        <iep-div-detail :value="form.amount+' 元'"></iep-div-detail>
      </el-form-item>

      <!-- <el-form-item label="税率：">
        <iep-div-detail :value="(form.taxRate*100)+'%'"></iep-div-detail>
      </el-form-item> -->

      <el-form-item v-if="form.parentType==='17'" label="计息比率：">
        <iep-div-detail :value="form.interestRate+'%'"></iep-div-detail>
      </el-form-item>

      <el-form-item v-if="form.parentType==='23'" label="预计退款时间：">
        <iep-div-detail :value="form.estimatedRefundTime"></iep-div-detail>
      </el-form-item>

      <el-form-item label="备注：">
        <iep-div-detail :value="form.remarks"></iep-div-detail>
      </el-form-item>

      <h2 style="text-align: center;">代缴</h2>
      <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
        <el-table-column prop="orgId" label="组织名称">
          <template slot-scope="scope">
            <iep-select size="small" v-model="scope.row.orgId" autocomplete="off" prefix-url="admin/org/all" disabled></iep-select>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额(元)">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.amount"></iep-div-detail>
          </template>
        </el-table-column>
      </el-table>

    </el-form>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">确认</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>

  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, toDtoForm } from './options'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      form: initForm(),
      formRequestFn: () => { },
    }
  },
  computed: {
    bankAmountOption () {
      if (this.form.companyId && this.form.expenditureMode === '1') {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.companyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.form.companyId}`,
        }
      }
    },
  },
  methods: {
    close () {
      this.dialogShow = false
    },
    submitClose () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn(toDtoForm(this.form))
      if (data.data) {
        this.$message.success('操作成功')
        this.submitClose()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
