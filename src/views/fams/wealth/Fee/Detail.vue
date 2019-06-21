<template>
  <div>
    <basic-container>
      <page-header title="查看财务费用申请" :back-option="backOption">
        <template v-if="form.primaryAudit===0">
          <iep-button @click="handlePass(form, false)">通过</iep-button>
          <iep-button @click="handleReject(form, false)">驳回</iep-button>
          <iep-button @click="handleTrans(form)">转交</iep-button>
        </template>
        <template v-if="form.primaryAudit!==0&&form.financialAudit===0">
          <iep-button @click="handlePass(form, true)">通过</iep-button>
          <iep-button @click="handleReject(form, true)">驳回</iep-button>
        </template>
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="140px" size="small">
        <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
          <el-table-column prop="expenditureType" label="付款事项">
            <template slot-scope="scope">
              <iep-dict-cascader-detail dictName="fams_expenditure_type" :value="scope.row.type"></iep-dict-cascader-detail>
            </template>
          </el-table-column>
          <el-table-column label="收款单位账号及开户行">
            <template slot-scope="scope">
              <iep-div-detail :value="dictsMap.invoiceType[scope.row.invoiceType]"></iep-div-detail>
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

        <iep-form-item class="form-half" label-name="财务审批人">
          <iep-div-detail v-model="form.financialName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item v-if="auditorOption" class="form-half" label-name="部门审批人">
          <iep-div-detail v-model="form.auditorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="是否代缴">
          <el-radio-group v-model="form.isSubstitute">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="代缴组织">
          <iep-div-detail :value="form.ccOrgName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="代缴公司">
          <iep-div-detail :value="form.ccCompanyName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item label-name="备注">
          <iep-div-detail :value="form.remarks"></iep-div-detail>
        </iep-form-item>

        <iep-divider />

        <el-form-item label="附件上传:">
          <iep-upload-select style="margin-top: 5px;" v-model="form.costFile"></iep-upload-select>
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

      </el-form>
    </basic-container>
    <fee-pass-dialog-form ref="FeePassDialogForm" :is-financial="isFinancial" @load-page="goBack"></fee-pass-dialog-form>
    <fee-reject-dialog-form ref="FeeRejectDialogForm" :is-financial="isFinancial" @load-page="goBack"></fee-reject-dialog-form>
    <fee-trans-dialog-form ref="FeeTransDialogForm" @load-page="goBack"></fee-trans-dialog-form>
  </div>
</template>
<script>
import { dictsMap, initForm } from './options'
import { getFeeById } from '@/api/fams/fee'
import FeePassDialogForm from '@/views/fams/Components/FeePassDialogForm.vue'
import FeeRejectDialogForm from '@/views/fams/Components/FeeRejectDialogForm.vue'
import FeeTransDialogForm from '@/views/fams/Components/FeeTransDialogForm'
export default {
  components: { FeePassDialogForm, FeeRejectDialogForm, FeeTransDialogForm },
  data () {
    return {
      dictsMap,
      form: initForm(),
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
    projectOption () {
      return this.form.referType === 1
    },
    auditorOption () {
      return this.form.referType !== 3
    },
  },
  created () {
    getFeeById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {
    handleTrans (row) {
      this.$refs['FeeTransDialogForm'].id = row.id
      this.$refs['FeeTransDialogForm'].user = { id: '', name: '' }
      this.$refs['FeeTransDialogForm'].content = ''
      this.$refs['FeeTransDialogForm'].dialogShow = true
    },
    handlePass (row, isFinancial) {
      this.isFinancial = isFinancial
      this.$refs['FeePassDialogForm'].id = row.id
      this.$refs['FeePassDialogForm'].content = ''
      this.$refs['FeePassDialogForm'].dialogShow = true
    },
    handleReject (row, isFinancial) {
      this.isFinancial = isFinancial
      this.$refs['FeeRejectDialogForm'].id = row.id
      this.$refs['FeeRejectDialogForm'].content = ''
      this.$refs['FeeRejectDialogForm'].dialogShow = true
    },
    goBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
