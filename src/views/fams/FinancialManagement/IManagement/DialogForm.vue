<template>
  <iep-dialog :dialog-show="dialogShow" title="新增收入" width="700px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="100px">
      <el-form-item label="收入类型：">
        <iep-dict-cascader dictName="fams_income_type" v-model="form.type"></iep-dict-cascader>
      </el-form-item>
      <el-form-item label="收入时间：">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="收入组织：">
        <iep-div-detail :value="form.orgName"></iep-div-detail>
      </el-form-item>
      <el-form-item label="收入方式：">
        <el-radio-group v-model="form.incomeMode" @change="handleChange">
          <el-radio v-for="(item, idx) in dictsMap.incomeMode" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收入公司：">
        <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
      </el-form-item>
      <el-form-item v-if="!bankAmountOption.disabled" label="银行户头：">
        <iep-select v-model="form.accountId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
      </el-form-item>
      <el-form-item label="关联合同：">
        <el-button size="small" icon="el-icon-plus"></el-button>
      </el-form-item>
      <el-form-item label="收入金额：">
        <iep-input-number v-model="form.amount"></iep-input-number>
      </el-form-item>
      <el-form-item label="开票组织：">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org" placeholder="请选择开票组织"></iep-select>
      </el-form-item>
      <el-form-item label="开票税率：">
        <el-select v-model="form.invoicingTax">
          <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="item.label+'%'">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="form.remarks"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap } from './options'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    bankAmountOption () {
      if (this.form.companyId && this.form.incomeMode === '1') {
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
    handleChange () {
      this.form.accountId = ''
    },

    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

