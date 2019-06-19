<template>
  <div>
    <basic-container>
      <page-header title="查看报销" :back-option="backOption">
        <iep-button v-if="form.primaryAudit===0" @click="handlePass(form)">通过</iep-button>
        <iep-button v-if="form.primaryAudit===0" @click="handleReject(form)">驳回</iep-button>
        <iep-button v-if="form.primaryAudit===0" @click="handleTrans(form)">转交</iep-button>
      </page-header>
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

        <iep-form-item class="form-half" label-name="发票创建人">
          <iep-div-detail v-model="form.creatorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="财务审批人">
          <iep-div-detail v-model="form.financialName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item v-if="auditorOption" class="form-half" label-name="部门审批人">
          <iep-div-detail v-model="form.auditorName"></iep-div-detail>
        </iep-form-item>

        <iep-form-item label-name="备注">
          <iep-div-detail :value="form.remarks"></iep-div-detail>
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
              <div>备注：
                <iep-div-detail style="display: inline;" :value="process.remarks"></iep-div-detail>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>

      </el-form>
    </basic-container>
    <pass-dialog-form ref="passDialogForm" @load-page="goBack"></pass-dialog-form>
    <reject-dialog-form ref="rejectDialogForm" @load-page="goBack"></reject-dialog-form>
    <trans-dialog-form ref="transDialogForm" @load-page="goBack"></trans-dialog-form>
  </div>
</template>
<script>
import { dictsMap, initForm } from './options'
import { getInvoiceById } from '@/api/fams/invoice'
import passDialogForm from '../InvoiceApproval/passDialogForm'
import rejectDialogForm from '../InvoiceApproval/rejectDialogForm'
import transDialogForm from '../InvoiceApproval/transDialogForm'
export default {
  components: { rejectDialogForm, passDialogForm, transDialogForm },
  data () {
    return {
      dictsMap,
      form: initForm(),
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
    getInvoiceById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {
    handleTrans (row) {
      this.$refs['transDialogForm'].id = row.id
      this.$refs['transDialogForm'].user = { id: '', name: '' }
      this.$refs['transDialogForm'].content = ''
      this.$refs['transDialogForm'].dialogShow = true
    },
    handlePass (row) {
      this.$refs['passDialogForm'].id = row.id
      this.$refs['passDialogForm'].content = ''
      this.$refs['passDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['rejectDialogForm'].id = row.id
      this.$refs['rejectDialogForm'].content = ''
      this.$refs['rejectDialogForm'].dialogShow = true
    },
    goBack () {
      this.$route.go(-1)
    },
  },
}
</script>
