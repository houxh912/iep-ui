<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}发票`" :back-option="backOption">
        <iep-button type="primary" @click="handleSubmit()">保存</iep-button>
      </page-header>
      <el-table :data="tableData" style="width: 100%" size="small" border show-summary>
        <el-table-column prop="type" label="支出类型">
          <template slot-scope="scope">
            <iep-dict-cascader size="small" dictName="fams_expenditure_type" v-model="scope.row.type"></iep-dict-cascader>
          </template>
        </el-table-column>
        <el-table-column label="发票类型">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.invoiceType" placeholder="请选择" clearable>
              <el-option v-for="(v,k) in dictsMap.invoiceType" :key="k" :label="v" :value="+k">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="发票金额">
          <template slot-scope="scope">
            <iep-input-number size="small" v-model="scope.row.amount"></iep-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <iep-button @click="handleDelete(scope.row, scope.$index)">删除</iep-button>
          </template>
        </el-table-column>
      </el-table>
      <iep-button style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember" plain>新增</iep-button>
      <a-divider />
      <el-form ref="form" class="form-detail" :model="form" :rules="rules" label-width="140px" size="small">
        <iep-form-item class="form-half" prop="referType" label-name="发票类型">
          <el-select size="small" v-model="form.referType" placeholder="请选择" clearable>
            <el-option v-for="(v,k) in dictsMap.referType" :key="k" :label="v" :value="+k">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item class="form-half" prop="companyId" label-name="发票抬头">
          <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" placeholder="请选择发票抬头"></iep-select>
        </iep-form-item>
        <iep-form-item class="form-half" prop="projectId" label-name="项目">
          <el-input v-model="form.projectId"></el-input>
        </iep-form-item>
        <iep-form-item class="form-half" prop="user" label-name="审批人">
          <iep-contact-select v-model="form.user"></iep-contact-select>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { dictsMap } from '../options'
function initTableForm () {
  return {
    type: [],
    invoiceType: '',
    amount: 0,
  }
}
function initForm () {
  return {
    referType: '',
    companyId: '',
    projectId: '',
    user: {
      id: 0,
      name: '',
    },
  }
}
export default {
  props: ['record'],
  data () {
    return {
      dictsMap,
      tableData: [],
      form: initForm(),
      rules: {
        referType: [
          { required: true, message: '请选择发票类型', trigger: 'blur' },
        ],
      },
      methodName: this.record.methodName || '新增',
      formRequestFn: this.record.formRequestFn || (() => { }),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
    }
  },
  methods: {
    handleSubmit () {
      this.form.relations = this.tableData
      this.form.auditorId = this.form.user.id
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleDelete (row, i) {
      this.tableData.splice(i, 1)
    },
    newMember () {
      this.tableData.push(initTableForm())
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
