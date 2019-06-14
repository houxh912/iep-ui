<template>
  <div>
    <basic-container>
      <page-header title="查看报销" :back-option="backOption">
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

        <iep-form-item class="form-half" label-name="财务审批人">
          <iep-div-detail v-model="form.financialAuditName"></iep-div-detail>
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
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>

      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { dictsMap, initForm } from './options'
import { getInvoiceById } from '@/api/fams/invoice'
export default {
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

  },
}
</script>
