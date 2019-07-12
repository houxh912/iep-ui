<template>
  <div class="iep-page-form project-relation">
    <iep-page-header :title="`${methodName}合同`" :backOption="backOption"></iep-page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="130px" style="margin-bottom: 50px;" class="form-detail">
      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="合同类型：" prop="contractType">
        <el-select v-model="formData.contractType" placeholder="请选择" :disabled="true">
          <el-option v-for="(item, value) in dictsMap.contractType" :key="value" :label="item" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联项目：">
        <IepProjectSelect v-model="formData.projectId" :projectName="formData.projectName"></IepProjectSelect>
      </el-form-item>
      <el-form-item label="合同说明 / 收款方式：">
        <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式" rows=5 maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <!-- <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup.mlms_business_type" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group> -->
        <businessType v-model="formData.businessType"></businessType>
      </el-form-item>
      <el-form-item label="合同标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime" :picker-options="signTimeOption"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime" :picker-options="finishTimeOption"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="formData.contractType==1">
        <el-col :span='12'>
          <el-form-item label="委托单位：">
            <IepCrmsSelect v-model="formData.companyOrgId" :option="[formData.companyName]" prefixUrl="crm/customer/myorcoll/list">
            </IepCrmsSelect>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <IepCrmsSelect v-model="formData.signCompanyOrgId" :option="[formData.signCompanyRealName]" prefixUrl="crm/customer/all/list" @change="projectChange">
            </IepCrmsSelect>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="签署组织：" prop="signDeptName">
            <el-input v-model="formData.signDeptName" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="承接组织：">
            <iep-select v-model="formData.underTakeDeptId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择调出组织" multiple></iep-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="市场经理：" prop="directorList">
            <iep-contact-select v-model="formData.directorList"></iep-contact-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="合同金额(元)：" prop="contractAmount">
            <el-input v-model="formData.contractAmount" placeholder="合同金额" maxlength="9"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="合同级别：" prop="contractLevel">
            <iep-dict-select v-model="formData.contractLevel" dict-name="mlms_contract_level"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="合同状态：" prop="contractStatus">
            <iep-dict-select v-model="formData.contractStatus" dict-name="mlms_contract_status"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
          <el-form-item label="保证金(元)：" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="保证金" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="历史合同：" prop="isHistory">
            <el-switch v-model="formData.isHistory" :active-value="2" :inactive-value="1" active-color="#13ce66" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="合同附件上传：" prop="contractFileList">
        <iep-upload v-model="formData.contractFileList" :limit="limit"></iep-upload>
      </el-form-item>
    </el-form>
    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { initFormData, rules, dictsMap } from './option'
import { mapGetters } from 'vuex'
import { updateData, getDataById } from '@/api/mlms/material/datum/contract'
import { getMarket } from '@/api/crms/customer'
import businessType from './businessType'

export default {
  components: { businessType },
  computed: {
    ...mapGetters(['userInfo', 'dictGroup']),
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
    add: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      loadState: false,
      dialogShow: false,
      methodName: '新增',
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      id: '',
      directorList: [],
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('dialog')
        },
      },
      limit: 1,
      signTimeOption: {
        disabledDate: (time) => {
          if (this.formData.finishTime) {
            return time.getTime() > +new Date(this.formData.finishTime)
          } else {
            return time.getTime() < 0
          }
        },
      },
      finishTimeOption: {
        disabledDate: (time) => {
          if (this.formData.signTime) {
            return time.getTime() < +new Date(this.formData.signTime)
          } else {
            return time.getTime() < 0
          }
        },
      },
    }
  },
  created () {
    this.formRequestFn = this.add.formRequestFn
    this.methodName = this.add.methodName
    this.id = this.add.id
    this.formData.companyOrgId = this.record.id
    this.formData.companyName = { id: this.record.id, name: this.record.clientName }
    if (this.methodName == '修改') {
      this.open(this.add.contractId)
    }
  },
  methods: {
    // 编辑
    open (id) {
      getDataById(id).then(({ data }) => {
        let row = data.data
        if (row.underTakeDeptName) {
          row.underTakeDeptId = row.underTakeDeptName.map(m => m.id) // 承接部门
        }
        row.directorList = {
          id: row.directorId,
          name: row.directorRealName,
        }
        if (row.projectRelation) {
          row.projectId = row.projectRelation.id
          row.projectName = row.projectRelation.name
        }
        row.signDeptName = row.signDeptOrgName.name
        row.companyOrgObj = { id: row.companyOrgId, name: row.companyName ? row.companyName.name : '' }
        row.signCompanyOrgObj = { id: row.signCompanyOrgId, name: row.signCompanyRealName ? row.signCompanyRealName.name : '' }
        this.formData = Object.assign({}, this.formData, row)
        this.methodName = '编辑'
        this.formRequestFn = updateData
      })
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.formData.contractFile = this.formData.contractFileList.length > 0 ? this.formData.contractFileList[0].url : ''
      this.formData.directorId = this.formData.directorList.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          this.formRequestFn(this.formData).then(({ data }) => {
            this.loadState = false
            if (data.data) {
              this.$message({
                message: `${this.methodName}成功`,
                type: 'success',
              })
              this.$emit('dialog')
              this.$emit('async')
              this.loadPage()
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 根据签署单位查询市场经理
    projectChange (val) {
      if (val) {
        getMarket({ clientId: val }).then(({ data }) => {
          let row = data.data
          let obj = {}
          obj.directorList = { id: row.id, name: row.name }
          this.formData = Object.assign({}, this.formData, obj)
        })
      }
    },
  },
  mounted () {
    this.formData.signDeptOrgId = this.userInfo.orgId
    this.formData.signDeptName = this.userInfo.orgName
  },
}
</script>

<style lang="scss" scoped>
.project-relation {
  .el-tag {
    margin-right: 10px;
  }
}
</style>
