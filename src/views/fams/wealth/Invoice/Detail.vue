<template>
  <div>
    <basic-container>
      <iep-page-header title="查看报销" :back-option="backOption">
        <template v-if="form.primaryAudit===0 && isApproval">
          <iep-button @click="handlePass(form, false)">通过</iep-button>
          <iep-button @click="handleReject(form, false)">驳回</iep-button>
          <iep-button @click="handleTrans(form)">转交</iep-button>
        </template>
        <template v-if="form.primaryAudit===1&&form.financialAudit===0 && isFinancialApproval">
          <iep-button @click="handlePass(form, true)">通过</iep-button>
          <iep-button @click="handleReject(form, true)">驳回</iep-button>
        </template>
      </iep-page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="140px" size="small">
        <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
          <el-table-column prop="expenditureType" label="支出类型">
            <template slot-scope="scope">
              <iep-dict-cascader-detail dictName="fams_expenditure_type" :value="scope.row.type"></iep-dict-cascader-detail>
            </template>
          </el-table-column>
          <el-table-column label="报销类型">
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

        <iep-form-item class="form-half" label-name="报销类型">
          <iep-div-detail :value="dictsMap.referType[form.referType]"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="报销组织">
          <iep-div-detail :value="form.orgName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="报销抬头">
          <iep-div-detail :value="form.companyName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item v-if="projectOption" class="form-half" label-name="项目">
          <iep-div-detail :value="form.projectName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="申请人">
          <iep-div-detail v-model="form.creatorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="财务核准人">
          <iep-div-detail v-model="form.financialName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item v-if="auditorOption" class="form-half" label-name="部门核准人">
          <iep-div-detail v-model="form.auditorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item label-name="备注">
          <iep-div-detail :value="form.remarks" tag="pre"></iep-div-detail>
        </iep-form-item>

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
              <div style="display:flex;">
                <div style="flex: 0 0 50px;">备注：</div>
                <iep-div-detail-switch :value="process.remarks"></iep-div-detail-switch>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>

      </el-form>
    </basic-container>
    <invoice-pass-dialog-form ref="InvoicePassDialogForm" :is-financial="isFinancial" @load-page="goBack"></invoice-pass-dialog-form>
    <invoice-reject-dialog-form ref="InvoiceRejectDialogForm" :is-financial="isFinancial" @load-page="goBack"></invoice-reject-dialog-form>
    <invoice-trans-dialog-form ref="InvoiceTransDialogForm" @load-page="goBack"></invoice-trans-dialog-form>
  </div>
</template>
<script>
import { dictsMap, initForm } from './options'
import { getInvoiceById } from '@/api/fams/invoice'
import InvoicePassDialogForm from '@/views/fams/Components/InvoicePassDialogForm.vue'
import InvoiceRejectDialogForm from '@/views/fams/Components/InvoiceRejectDialogForm.vue'
import InvoiceTransDialogForm from '@/views/fams/Components/InvoiceTransDialogForm'
export default {
  components: { InvoicePassDialogForm, InvoiceRejectDialogForm, InvoiceTransDialogForm },
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
    isApproval () {
      return this.$route.query.isApproval || false
    },
    isFinancialApproval () {
      return this.$route.query.isFinancialApproval || false
    },
    projectOption () {
      return this.form.referType === 1
    },
    auditorOption () {
      return this.form.referType !== 3
    },
  },
  created () {
    getInvoiceById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {
    handleTrans (row) {
      this.$refs['InvoiceTransDialogForm'].id = row.id
      this.$refs['InvoiceTransDialogForm'].user = { id: '', name: '' }
      this.$refs['InvoiceTransDialogForm'].content = ''
      this.$refs['InvoiceTransDialogForm'].dialogShow = true
    },
    handlePass (row, isFinancial) {
      this.isFinancial = isFinancial
      this.$refs['InvoicePassDialogForm'].id = row.id
      this.$refs['InvoicePassDialogForm'].content = ''
      this.$refs['InvoicePassDialogForm'].dialogShow = true
    },
    handleReject (row, isFinancial) {
      this.isFinancial = isFinancial
      this.$refs['InvoiceRejectDialogForm'].id = row.id
      this.$refs['InvoiceRejectDialogForm'].content = ''
      this.$refs['InvoiceRejectDialogForm'].dialogShow = true
    },
    goBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
