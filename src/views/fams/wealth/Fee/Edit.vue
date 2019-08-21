<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}财务费用申请`" :back-option="backOption">
        <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">存为草稿</iep-button>
        <iep-button :loading="submitFormLoading" @click="handlePublish()">保存并发送</iep-button>
      </iep-page-header>
      <el-table :data="tableData" style="width: 100%" size="small" border show-summary>
        <el-table-column prop="type" label="付款事项">
          <template slot-scope="scope">
            <iep-dict-cascader size="small" dictName="fams_expenditure_type" v-model="scope.row.type"></iep-dict-cascader>
          </template>
        </el-table-column>
        <el-table-column label="收款单位、账号及开户行">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.bank"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="报销金额(元)">
          <template slot-scope="scope">
            <iep-input-amount size="small" v-model="scope.row.amount"></iep-input-amount>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <iep-button @click="handleDelete(scope.row, scope.$index)">删除</iep-button>
          </template>
        </el-table-column>
      </el-table>
      <iep-button type="primary" style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember" plain>新增</iep-button>
      <iep-divider />
      <el-form ref="form" class="form-detail" :model="form" :rules="rules" label-width="140px" size="small">

        <iep-form-item label-name="报销组织" prop="orgId" class="form-half">
          <iep-select v-model="form.orgId" filterable autocomplete="off" prefix-url="admin/org/all" placeholder="请选择报销组织"></iep-select>
        </iep-form-item>

        <iep-form-item v-if="!companyOption.disabled" class="form-half" prop="companyId" label-name="报销公司">
          <iep-select v-model="form.companyId" filterable autocomplete="off" :prefix-url="companyOption.prefixUrl" placeholder="请选择报销公司"></iep-select>
        </iep-form-item>

        <el-form-item label="关联合同：" class="form-half">
          <iep-contract-select v-model="form.protocolId" :contractName="form.protocolName" @relation-change="handleContractChange"></iep-contract-select>
        </el-form-item>

        <el-form-item label="关联项目：" class="form-half">
          <iep-project-select v-model="form.projectId" :projectName="form.projectName" @relation-change="handleProjectChange"></iep-project-select>
        </el-form-item>

        <iep-form-item class="form-half" prop="auditor" label-name="部门核准">
          <iep-contact-select v-model="form.auditor" placeholder="如只需财务核准，无需填写部门核准，直接发送即可"></iep-contact-select>
        </iep-form-item>

        <iep-form-item class="form-half" label-name="是否代缴">
          <el-radio-group v-model="form.isSubstitute">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </iep-form-item>

        <iep-form-item v-if="form.isSubstitute" label-name="代缴组织" prop="ccOrgId" class="form-half">
          <iep-select v-model="form.ccOrgId" filterable autocomplete="off" prefix-url="admin/org/all" placeholder="请选择代缴组织"></iep-select>
        </iep-form-item>

        <iep-form-item v-if="!ccCompanyOption.disabled" class="form-half" prop="ccCompanyId" label-name="代缴公司">
          <iep-select v-model="form.ccCompanyId" filterable autocomplete="off" :prefix-url="ccCompanyOption.prefixUrl" placeholder="请选择代缴公司"></iep-select>
        </iep-form-item>

        <iep-form-item label-name="备注">
          <iep-input-area v-model="form.remarks" :maxlength="10000"></iep-input-area>
        </iep-form-item>

        <iep-divider />

        <el-form-item label="附件上传:" prop="costFile">
          <iep-upload-select style="margin-top: 5px;" v-model="form.costFile"></iep-upload-select>
        </el-form-item>

      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getFeeById, putFee, postFee } from '@/api/fams/fee'
import formMixins from '@/mixins/formMixins'
import { dictsMap, rules, initTableForm, initForm, formToVo } from './options'
export default {
  mixins: [formMixins],
  props: ['record'],
  data () {
    return {
      dictsMap,
      tableData: [],
      form: initForm(),
      rules,
      backOption: {
        isBack: true,
      },
      isPublish: false,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
    formRequestFn () {
      return this.id ? putFee : postFee
    },
    companyOption () {
      if (this.form.orgId) {
        return {
          disabled: false,
          prefixUrl: `fams/company/${this.form.orgId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    ccCompanyOption () {
      if (this.form.ccOrgId) {
        return {
          disabled: false,
          prefixUrl: `fams/company/${this.form.ccOrgId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
  },
  created () {
    if (this.id) {
      this.loadPage()
    }
  },
  methods: {
    handleContractChange (v) {
      this.form.projectId = v.id
      this.form.projectName = v.name
      this.form.auditor.id = v.userId
      this.form.auditor.name = v.realName
    },
    handleProjectChange (v, n, value) {
      this.form.protocolId = v.id
      this.form.protocolName = v.name
      this.form.auditor.id = value.userId
      this.form.auditor.name = value.realName
    },
    handlePublish () {
      this.isPublish = true
      this.mixinsSubmitFormGen()
    },
    async submitForm () {
      const publish = this.isPublish
      if (this.tableData.length === 0) {
        this.$message('费用数目至少存在一条')
        return
      }
      this.form.relations = this.tableData
      this.form.auditorId = this.form.auditor.id
      const { data } = await this.formRequestFn(this.form, publish)
      if (data.data) {
        this.$message.success('操作成功')
        this.$router.history.go(-1)
      } else {
        this.$message(data.msg)
      }
    },
    loadPage () {
      getFeeById(this.id).then(({ data }) => {
        this.form = formToVo(data.data)
        this.tableData = this.form.relations
      })
    },
    handleDelete (row, i) {
      this.tableData.splice(i, 1)
    },
    newMember () {
      this.tableData.push(initTableForm())
    },
  },
}
</script>
