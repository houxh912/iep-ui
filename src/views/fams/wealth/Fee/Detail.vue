<template>
  <div>
    <basic-container>
      <iep-page-header title="查看财务费用申请" :back-option="backOption">
        <template v-if="form.status===1 && isApproval">
          <iep-button @click="handlePass(form, false)">通过</iep-button>
          <iep-button @click="handleReject(form, false)">驳回</iep-button>
          <iep-button @click="handleTrans(form)">转交</iep-button>
        </template>
        <template v-if="form.status===2 && isApproval">
          <iep-button @click="handlePass(form, true)">通过</iep-button>
          <iep-button @click="handleReject(form, true)">驳回</iep-button>
        </template>
      </iep-page-header>
      <el-form ref="form" class="form-detail" :model="flowForm" :rules="rules" label-width="140px" size="small">
        <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
          <el-table-column prop="expenditureType" label="付款事项">
            <template slot-scope="scope">
              <iep-dict-cascader-detail dictName="fams_expenditure_type" :value="scope.row.type"></iep-dict-cascader-detail>
            </template>
          </el-table-column>
          <el-table-column label="收款单位、账号及开户行">
            <template slot-scope="scope">
              <iep-div-detail-switch :value="scope.row.bank"></iep-div-detail-switch>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="报销金额(元)">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
        </el-table>

        <iep-divider />

        <iep-form-item class="form-half" label-name="报销组织">
          <iep-div-detail :value="form.orgName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="报销公司">
          <iep-div-detail :value="form.companyName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="关联项目">
          <iep-div-detail :value="form.projectName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="关联合同">
          <iep-div-detail :value="form.protocolName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="申请人">
          <iep-div-detail v-model="form.creatorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="财务核准人">
          <iep-div-detail v-model="form.financeUserName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="部门核准人">
          <iep-div-detail v-model="form.auditorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="是否代缴">
          <span>{{form.isSubstitute ? '是' : '否'}}</span>
        </iep-form-item>

        <iep-form-item v-if="form.isSubstitute" class="form-half" label-name="代缴组织">
          <iep-div-detail :value="form.ccOrgName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item v-if="form.isSubstitute" class="form-half" label-name="代缴公司">
          <iep-div-detail :value="form.ccCompanyName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item label-name="备注">
          <iep-div-detail :value="form.remarks" tag="pre"></iep-div-detail>
        </iep-form-item>

        <iep-divider />

        <el-form-item label="附件上传:">
          <iep-upload-select style="margin-top: 5px;" v-model="form.costFile" disabled></iep-upload-select>
        </el-form-item>

        <iep-divider />

        <el-timeline>
          <el-timeline-item v-for="(process) in form.processes" :key="process.id" :timestamp="process.time">
            <el-card shadow="never">
              <div>
                <iep-img-avatar :src="process.avatar"></iep-img-avatar>
                {{process.name}}
                <span style="color: #aaa; font-size: 14px;">{{process.identityMarks.join(',')}}</span>
                <span>{{dictsMap.processStatus[process.status]}}</span>
              </div>
              <br>
              <div>备注：
                <iep-div-detail style="display: inline;" :value="process.remarks"></iep-div-detail>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>

        <template v-if="form.status === 4 && isApproval">

          <iep-divider />

          <el-form-item label="支出方式：" prop="payType">
            <el-radio-group v-model="flowForm.payType">
              <el-radio v-for="(item, idx) in dictsMap.payType" :key="idx" :label="idx">{{item}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="支出公司：" class="form-half">
            <iep-div-detail :value="form.ccCompanyName"></iep-div-detail>
          </el-form-item>

          <el-form-item v-if="!bankAmountOption.disabled" label="支出账户：" prop="bankId" class="form-half">
            <iep-select v-model="flowForm.bankId" autocomplete="off" :prefix-url="bankAmountOption.prefixUrl" placeholder="请选择支出账户"></iep-select>
          </el-form-item>
          <el-form-item label="">
            <iep-button type="primary" @click="handleGenFlow">生成流水</iep-button>
          </el-form-item>

        </template>

      </el-form>
    </basic-container>
    <fee-pass-dialog-form ref="FeePassDialogForm" :is-financial="isFinancial" @load-page="goBack"></fee-pass-dialog-form>
    <fee-reject-dialog-form ref="FeeRejectDialogForm" :is-financial="isFinancial" @load-page="goBack"></fee-reject-dialog-form>
    <fee-trans-dialog-form ref="FeeTransDialogForm" @load-page="goBack"></fee-trans-dialog-form>
  </div>
</template>
<script>
import { dictsMap, initForm, initFlowForm, formToVo, flowRules } from './options'
import formMixins from '@/mixins/formMixins'
import { getFeeById } from '@/api/fams/fee'
import { genFlow } from '@/api/fams/expenditure'
import FeePassDialogForm from '@/views/fams/Components/FeePassDialogForm.vue'
import FeeRejectDialogForm from '@/views/fams/Components/FeeRejectDialogForm.vue'
import FeeTransDialogForm from '@/views/fams/Components/FeeTransDialogForm'
export default {
  mixins: [formMixins],
  components: { FeePassDialogForm, FeeRejectDialogForm, FeeTransDialogForm },
  data () {
    return {
      rules: flowRules,
      dictsMap,
      form: initForm(),
      flowForm: initFlowForm(),
      isFinancial: false,
      backOption: {
        isBack: true,
      },
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    isApproval () {
      return this.$route.query.approval === 'true'
    },
    bankAmountOption () {
      if (this.flowForm.payType === '1') {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.flowForm.companyId}`,
        }
      } else {
        return {
          disabled: true,
          prefixUrl: `fams/bank_account/${this.flowForm.companyId}`,
        }
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getFeeById(this.id).then(({ data }) => {
        this.flowForm = initFlowForm()
        this.form = formToVo(data.data)
        this.flowForm.costId = this.form.costId
        this.flowForm.companyId = this.form.isSubstitute ? this.form.ccCompanyId : this.form.companyId
      })
    },
    async handleGenFlow () {
      try {
        await this.mixinsValidate()
        genFlow(this.flowForm).then(({ data }) => {
          if (data.data) {
            this.$message.success('生成成功')
            this.loadPage()
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
    handleTrans (row) {
      this.$refs['FeeTransDialogForm'].id = row.costId
      this.$refs['FeeTransDialogForm'].user = { id: '', name: '' }
      this.$refs['FeeTransDialogForm'].content = ''
      this.$refs['FeeTransDialogForm'].dialogShow = true
    },
    handlePass (row, isFinancial) {
      this.isFinancial = isFinancial
      this.$refs['FeePassDialogForm'].id = row.costId
      this.$refs['FeePassDialogForm'].content = ''
      this.$refs['FeePassDialogForm'].dialogShow = true
    },
    handleReject (row, isFinancial) {
      this.isFinancial = isFinancial
      this.$refs['FeeRejectDialogForm'].id = row.costId
      this.$refs['FeeRejectDialogForm'].content = ''
      this.$refs['FeeRejectDialogForm'].dialogShow = true
    },
    goBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
