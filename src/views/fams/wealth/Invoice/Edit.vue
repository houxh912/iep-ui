<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}报销-${dictsMap.referType[this.form.referType]}`" :back-option="backOption">
        <iep-button type="primary" @click="handleSubmit()">存为草稿</iep-button>
        <iep-button type="primary" @click="handleSubmit(true)">发布</iep-button>
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
        <el-table-column prop="amount" label="报销金额(元)">
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
      <iep-button type="primary" style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember" plain>新增</iep-button>
      <iep-divider />
      <el-form ref="form" class="form-detail" :model="form" :rules="rules" label-width="140px" size="small">

        <iep-form-item class="form-half" prop="referType" label-name="报销类型">
          <el-select size="small" v-model="form.referType" placeholder="请选择报销类型" clearable disabled>
            <el-option v-for="(v,k) in dictsMap.referType" :key="k" :label="v" :value="+k">
            </el-option>
          </el-select>
        </iep-form-item>

        <iep-form-item label-name="报销组织" prop="orgId" class="form-half">
          <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择报销组织"></iep-select>
        </iep-form-item>

        <iep-form-item v-if="!companyOption.disabled" class="form-half" prop="companyId" label-name="报销抬头">
          <iep-select v-model="form.companyId" autocomplete="off" :prefix-url="companyOption.prefixUrl" placeholder="请选择报销抬头"></iep-select>
        </iep-form-item>

        <iep-form-item v-if="projectOption" class="form-half" prop="projectId" label-name="项目">
          <iep-project-select v-model="form.projectId" :project-name="form.projectName"></iep-project-select>
        </iep-form-item>

        <iep-form-item v-if="auditorOption" class="form-half" prop="auditor" label-name="审批人" tip="报销金额超过 1 万，请添加部门班长为审批人">
          <iep-contact-select v-model="form.auditor"></iep-contact-select>
        </iep-form-item>

      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getInvoiceById, putInvoice, postInvoice } from '@/api/fams/invoice'
import formMixins from '@/mixins/formMixins'
import { dictsMap, rules, initTableForm, initForm } from './options'
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
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    referType () {
      return +this.$route.query.referType
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
    formRequestFn () {
      return this.id ? putInvoice : postInvoice
    },
    projectOption () {
      return this.form.referType === 1
    },
    auditorOption () {
      return this.form.referType !== 3
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
  },
  created () {
    if (this.id) {
      this.loadPage()
    } else {
      this.form.referType = this.referType
    }
  },
  methods: {
    async handleSubmit (isPublish = false) {
      try {
        await this.mixinsValidate()
        if (this.tableData.length === 0) {
          this.$message('报销数目至少存在一条')
          return
        }
        this.form.relations = this.tableData
        this.form.auditorId = this.form.auditor.id
        this.formRequestFn(this.form, isPublish).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.$router.go(-1)
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
    loadPage () {
      getInvoiceById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
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
