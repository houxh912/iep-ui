<template>
  <div>
    <basic-container>
      <page-header title="查看发票" :back-option="backOption">
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" label-width="140px" size="small">
        <el-table :data="form.relations" style="width: 100%" size="small" border show-summary>
          <el-table-column prop="expenditureType" label="支出类型">
            <template slot-scope="scope">
              <iep-dict-cascader disabled size="small" dictName="fams_expenditure_type" :value="scope.row.type"></iep-dict-cascader>
            </template>
          </el-table-column>
          <el-table-column label="发票类型">
            <template slot-scope="scope">
              <el-select disabled size="small" :value="scope.row.invoiceType" placeholder="请选择" clearable>
                <el-option v-for="(v,k) in dictsMap.invoiceType" :key="k" :label="v" :value="+k">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="发票金额">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
        </el-table>
        <a-divider />
        <iep-form-item class="form-half" label-name="发票类型">
          <el-select disabled size="small" v-model="form.referType" placeholder="请选择" clearable>
            <el-option v-for="(v,k) in dictsMap.referType" :key="k" :label="v" :value="+k">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="发票抬头">
          <iep-select disabled v-model="form.companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择发票抬头"></iep-select>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="项目">
          <el-input v-model="form.projectId"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" label-name="审批人">
          <iep-contact-select disabled v-model="form.auditor"></iep-contact-select>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { dictsMap } from '../options'
import { getInvoiceById } from '@/api/fams/invoice'
function initForm () {
  return {
    referType: '',
    companyId: '',
    projectId: '',
    auditor: {
      id: 0,
      name: '',
    },
    relations: [],
  }
}
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
