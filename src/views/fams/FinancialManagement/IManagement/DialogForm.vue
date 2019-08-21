<template>
  <iep-dialog :dialog-show="dialogShow" title="新增收入" width="700px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="收入类型：" prop="type">
        <iep-dict-cascader dictName="fams_income_type" v-model="form.type"></iep-dict-cascader>
      </el-form-item>
      <el-form-item label="收入时间：" prop="createTime">
        <iep-date-picker v-model="form.createTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="收入组织：" prop="orgName">
        <iep-div-detail :value="form.orgName"></iep-div-detail>
      </el-form-item>
      <el-form-item label="收入方式：" prop="incomeMode">
        <el-radio-group v-model="form.incomeMode" @change="handleChange">
          <el-radio v-for="(item, idx) in dictsMap.incomeMode" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收入公司：" prop="companyId">
        <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择收入公司"></iep-select>
      </el-form-item>
      <el-form-item v-if="!bankAmountOption.disabled" label="银行户头：" prop="accountId">
        <iep-select v-model="form.accountId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择银行账户"></iep-select>
      </el-form-item>
      <el-form-item label="关联合同：">
        <iep-contract-select v-model="form.protocolId" :contractName="form.protocolName" @relation-change="handleContractChange"></iep-contract-select>
      </el-form-item>
      <el-form-item label="关联项目：">
        <iep-project-select v-model="form.projectId" :projectName="form.projectName" @relation-change="handleProjectChange"></iep-project-select>
      </el-form-item>
      <el-form-item label="关联项目编号：">
        <iep-div-detail :value="form.serialNo"></iep-div-detail>
      </el-form-item>
      <el-form-item label="收入金额(元)：" prop="amount">
        <iep-input-amount v-model="form.amount" :min="-99999999"></iep-input-amount>
      </el-form-item>
      <!-- <el-form-item label="开票费(元)：">
        <iep-input-number v-model="form.invoiceAmount" :min="-99999999"></iep-input-number>
      </el-form-item> -->
      <!-- <el-form-item label="开票组织：">
        <iep-select v-model="form.invoiceOrgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择开票组织"></iep-select>
      </el-form-item> -->
      <!-- <el-form-item label="开票税率：">
        <el-select v-model="form.invoicingTax">
          <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="(+item.label/100)">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item v-if="form.type[0]==='6'" label="计息比率：">
        <el-select v-model="form.interestRate">
          <el-option v-for="item in dictGroup['fams_interest_rate']" :key="item.value" :label="(+item.label/100)+'%'" :value="(+item.label/10000)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <iep-input-area v-model="form.remarks"></iep-input-area>
      </el-form-item>
      <div class="collection-box">
        <el-collapse-transition>
          <div v-show="isCollection" class="collection-wrapper">
            <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
              <el-table-column prop="orgId" label="组织名称">
                <template slot-scope="scope">
                  <iep-select size="small" v-model="scope.row.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额(元)">
                <template slot-scope="scope">
                  <iep-input-amount size="small" v-model="scope.row.amount" :min="-99999999"></iep-input-amount>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <iep-button @click="handleDelete(scope.row, scope.$index)">删除</iep-button>
                </template>
              </el-table-column>
            </el-table>
            <iep-button type="primary" style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember">新增</iep-button>
          </div>
        </el-collapse-transition>
        <div class="collection-real-wrapper"></div>
        <iep-button :icon="isCollection ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" class="collection-btn" @click="isCollection = !isCollection">代收</iep-button>
      </div>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="confirmForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
    <confirm-form ref="ConfirmForm" @load-page="close"></confirm-form>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
import ConfirmForm from './ConfirmForm'
import { mapGetters } from 'vuex'
function initTableForm () {
  return {
    orgId: '',
    amount: 0,
  }
}
export default {
  components: { ConfirmForm },
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      isCollection: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
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
    async confirmForm () {
      if (this.form.relations.length) {
        const sumAmount = this.form.relations.reduce((accumulator, currentValue) => accumulator.amount + currentValue.amount)
        // console.log(sumAmount, this.form.amount)
        if (sumAmount > this.form.amount) {
          this.$message('总代收金额不得超过收入金额')
          return
        }
      }
      const valid = await this.mixinsForm()
      if (valid) {
        this.$refs['ConfirmForm'].form = { ...this.form }
        this.$refs['ConfirmForm'].formRequestFn = this.formRequestFn
        this.$refs['ConfirmForm'].dialogShow = true
      }
    },
    newMember () {
      this.form.relations.push(initTableForm())
    },
    handleDelete (row, i) {
      this.form.relations.splice(i, 1)
    },
    handleContractChange (v, n, value) {
      this.form.projectId = v && v.id
      this.form.projectName = v && v.name
      this.form.serialNo = v && v.serialNo
      this.form.protocolName = value && value.name
    },
    handleProjectChange (v, n, value) {
      this.form.protocolId = v && v.id
      this.form.protocolName = v && v.name
      this.form.serialNo = value && value.serialNo
      this.form.projectName = value && value.name
    },
    handleChange () {
      this.form.accountId = ''
    },
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
<style lang="scss" scoped>
.collection-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.collection-btn {
  margin: 0;
  border-top: none;
  margin-top: -1px;
  border-radius: 0 0 5px 5px;
}
.collection-real-wrapper {
  width: 100%;
  border-bottom: 1px solid #eee;
}
.collection-wrapper {
  width: 100%;
}
</style>

